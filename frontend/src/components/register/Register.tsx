import React, { useState } from "react";
import "./Register.css";
import { RegisterUser } from "../../services/auth/authService"; 
// import { useLogin } from "../../context/LoginContext"; // Om du vill logga in användaren direkt

function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // const { login } = useLogin(); // Om du vill logga in användaren direkt efter registrering

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
  
      alert("User registered successfully!");
  
      // Om du vill logga in användaren direkt
      // login(response.user, response.token);
    } catch (error: unknown) {
      console.error("Registration error:", error);
  
      // Kontrollera om error är en instans av Error för att få ett tydligt felmeddelande
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
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

  const backToLogin = (): void => {
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    const registerSectionRef = document.querySelector(".register-wrapper") as HTMLElement;
    if (loginSectionRef) {
      loginSectionRef.classList.remove("hide");
    }

    if (registerSectionRef) {
      registerSectionRef.classList.add("hide");
    }
  };

  return (
    <section className="register-wrapper hide">
      <span className="register__back-to-login" onClick={backToLogin}>
        Back to login
      </span>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          aria-label="E-mail"
          placeholder="E-mail"
          className="register-inputField"
        />
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
      <p className="login__close-btn" onClick={handleClose}>
        X
      </p>
    </section>
  );
}

export default Register;

// Författare Adréan
// Modifierad av: Sandra