import "./Register.css";
import React, { useState } from "react";
import { registerSchema } from "../../models/registerSchema";
import useHeaderStore from "../../stores/headerStore"; // Använd Zustand-storen
import { RegisterUser } from "../../services/auth/authService";
import { RegisterType } from "../../types/registerType"; // Kontrollera importvägen

function Register() {
  const [formData, setFormData] = useState<RegisterType>({
    email: "",
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Zustand-metoder headerStore.ts
  const setLoginVisible = useHeaderStore((state) => state.setLoginVisible);
  const isRegisterVisible = useHeaderStore((state) => state.isRegisterVisible);
  const setRegisterVisible = useHeaderStore((state) => state.setRegisterVisible);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kontrollera att lösenord matchar
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validera formData med registerSchema
    const { error: validationError } = registerSchema.validate(formData, { abortEarly: false });
    if (validationError) {
      setError(validationError.details.map((detail) => detail.message).join(", "));
      return;
    }

    try {
      const response = await RegisterUser(formData); // registerUser från authService

      setError(null);

      // Växla till login-vyn
      setRegisterVisible(false);
      setLoginVisible(true);
    } catch (error: unknown) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = (): void => {
    setRegisterVisible(false);
  };

  const backToLogin = (): void => {
    setRegisterVisible(false);
    setLoginVisible(true);
  };

  return (
    <section className={`register-wrapper ${isRegisterVisible ? "" : "hide"}`}>
      <span className="register__back-to-login" onClick={backToLogin}>
        Back to login
      </span>
      <form onSubmit={handleRegister} className="register-form">
        {error && <p className="error">{error}</p>}
        <input
          name="username"
          type="text"
          aria-label="Username"
          placeholder="Username"
          className="register-inputField"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          aria-label="Email"
          placeholder="Email"
          className="register-inputField"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          aria-label="Password"
          placeholder="Password"
          className="register-inputField"
          value={formData.password}
          onChange={handleChange}
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

// Författare Adréan
