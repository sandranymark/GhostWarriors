import "./Login.css";
import { useState } from "react";
import { useLogin } from "../../context/LoginContext";
import { LoginCredentials } from "../../types/loginType"; // Importera typen
import { RxAvatar } from "react-icons/rx";
import React from "react";
import { loginUser } from "../../services/auth/authService"; 

function Login() {
  const { login } = useLogin();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = { username, password };

    try {
      const data = await loginUser(credentials);

      if (data.user && data.token) {
        login(data.user, data.token);
        setError(null);
        console.log("User logged in:", data.user);
        console.log("Token:", data.token);
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred while logging in");
    }
  };

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    const registerSectionRef = document.querySelector(".register-wrapper") as HTMLElement;
    if (loginSectionRef) {
      loginSectionRef.classList.add("hide");
      registerSectionRef.classList.remove("hide");
    }
  };

  const handleClose = (): void => {
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    const registerSectionRef = document.querySelector(".register-wrapper") as HTMLElement;
    const secondSectionRef = document.querySelector(".app > section:nth-child(2)") as HTMLElement;
    if (secondSectionRef) {
      secondSectionRef.style.filter = "none";
    }

    if (loginSectionRef) {
      loginSectionRef.classList.add("hide");
      loginSectionRef.style.display = "none";
      loginSectionRef.classList.remove("animate");
    }

    if (registerSectionRef) {
      registerSectionRef.classList.add("hide");
    }
  };

  return (
    <section className="login-wrapper hide">
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
          <span className="login__button-wrapper">
            <button type="submit" className="login-btn">
              Login
            </button>
            <button onClick={handleRegister} type="button" className="register-btn">
              Create an account
            </button>
          </span>
        </div>
      </form>
      <p className="login__close-btn" onClick={handleClose}>
        X
      </p>
    </section>
  );
};

export default Login
