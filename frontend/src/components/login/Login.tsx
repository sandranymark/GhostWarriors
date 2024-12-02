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
        console.log("Saving user to localStorage:", data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        console.log("localStorage after saving:", {
          user: localStorage.getItem("user"),
          token: localStorage.getItem("token"),
        });

        setIsLoggedIn(true);
        setUser({ username: data.user.username, role: data.user.role });

        // Kontrollera användarens roll och navigera
        if (data.user.role === "admin") {
          navigate("/staff");
        } else if (data.user.role === "user") {
          navigate("/menu");
        } else {
          setError("Unknown user role.");
          return;
        }

        setLoginVisible(false); // Stäng login-dialogen
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred while logging in");
    }
  };

  const handleRegister = (): void => {
    setLoginVisible(false); // Dölj Login
    setRegisterVisible(true); // Visa Register
  };

  const handleClose = (): void => {
    setLoginVisible(false);
    onClose?.();
  };

  return (
    <section className={`login-wrapper animate ${className || "hide"}`}>
      <RxAvatar className="login-avatar" />
      <form onSubmit={handleLogin} className="login-form">
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
          {error && <p className="error">{error}</p>}
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
