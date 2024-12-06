import "./Register.css";
import React, { useState } from "react";
import useHeaderStore from "../../stores/headerStore";
import { RegisterType } from "../../types/registerType";
import { registerSchema } from "../../models/registerSchema";
import { RegisterUser } from "../../services/auth/authService";

function Register() {
  const [formData, setFormData] = useState<RegisterType>({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Zustand-metoder headerStore.ts
  const setLoginVisible = useHeaderStore((state) => state.setLoginVisible);
  const isRegisterVisible = useHeaderStore((state) => state.isRegisterVisible);
  const setRegisterVisible = useHeaderStore(
    (state) => state.setRegisterVisible
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validera formData med registerSchema
    const { error: validationError } = registerSchema.validate(formData, {
      abortEarly: false,
    });
    if (validationError) {
      setError(
        validationError.details.map((detail) => detail.message).join(", ")
      );
      return;
    }

    try {
      await RegisterUser(formData);

      setError(null);
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
          value={formData.username.toLowerCase()}
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
    </section>
  );
}

export default Register;

// Författare Adréan
