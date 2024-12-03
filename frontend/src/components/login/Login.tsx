import "./Login.css";
import { useState } from "react";
import { LoginCredentials } from "../../types/loginType";
import { RxAvatar } from "react-icons/rx";
import { loginUser } from "../../services/auth/authService";
import { useNavigate } from "react-router-dom";
import useHeaderStore from "../../stores/headerStore";
import useAuthStore from "../../stores/authStore";

interface LoginProps {
  className?: string;
  onClose?: () => void;
}

function Login({ className, onClose }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setLoginVisible = useHeaderStore((state) => state.setLoginVisible);
  const setRegisterVisible = useHeaderStore((state) => state.setRegisterVisible);

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = { username, password };

    try {
      const data = await loginUser(credentials);

      if (data.user && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setIsLoggedIn(true);
        setUser({ username: data.user.username, role: data.user.role });

        // Kontrollera användarens roll och navigera
        navigate(data.user.role === "admin" ? "/staff" : "/menu");
        setLoginVisible(false);
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError("An error occurred while logging in");
    }
  };

  const handleRegister = (): void => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  const handleClose = (): void => {
    setLoginVisible(false);
    onClose?.();
    setError("");
    setUsername("");
    setPassword("");
  };

  return (
    <section className={`login-wrapper animate ${className || "hide"}`}>
      <RxAvatar className="login-avatar" />
      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error">{error}</p>}
        <div className="login-container">
          <input
            className="login-inputField"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            placeholder="Username"
            required
          />
          <input
            className="login-inputField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            placeholder="Password"
            required
          />
          <div className="login__button-wrapper">
            <button type="submit" className="login-btn">
              Login
            </button>
            <button type="button" className="register-btn" onClick={handleRegister}>
              Create Account
            </button>
          </div>
        </div>
      </form>
      <p className="login__close-btn" onClick={handleClose}>
        X
      </p>
    </section>
  );
}

export default Login;
