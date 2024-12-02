import "./Register.css";
import React, { useState } from "react";
import useHeaderStore from "../../stores/headerStore"; // Använd Zustand-storen
import { RegisterUser } from "../../services/auth/authService";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Zustand-metoder headerStore.ts
  const setLoginVisible = useHeaderStore((state) => state.setLoginVisible);
  const isRegisterVisible = useHeaderStore((state) => state.isRegisterVisible);
  const setRegisterVisible = useHeaderStore((state) => state.setRegisterVisible);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const credentials = { username, email, password };

    try {
      const response = await RegisterUser(credentials); // registerUser från authService
      console.log("Registration success:", response);

      setError(null);

      // Visa en alert och växla till login-komponenten
      alert("User registered successfully!");
      setRegisterVisible(false); // Dölj Register
      setLoginVisible(true); // Visa Login
    } catch (error: unknown) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleClose = (): void => {
    setRegisterVisible(false); // Dölj Register
  };

  const backToLogin = (): void => {
    setRegisterVisible(false); // Dölj Register
    setLoginVisible(true); // Visa Login
  };

  return (
    <section className={`register-wrapper ${isRegisterVisible ? "" : "hide"}`}>
      <span className="register__back-to-login" onClick={backToLogin}>
        Back to login
      </span>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          aria-label="Username"
          placeholder="Username"
          className="register-inputField"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          aria-label="Email"
          placeholder="Email"
          className="register-inputField"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          aria-label="Password"
          placeholder="Password"
          className="register-inputField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          aria-label="Confirm password"
          placeholder="Confirm password"
          className="register-inputField"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
      <p className="register__close-btn" onClick={handleClose}>
        X
      </p>
    </section>
  );
}

export default Register;
