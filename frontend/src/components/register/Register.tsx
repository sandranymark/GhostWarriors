import { useEffect } from "react";
import "./Register.css";
// import { handleClose } from "../../Utils/handleClose/handleClose";

function Register() {
  function handleClose(): void {
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
  }

  function backToLogin(): void {
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    const registerSectionRef = document.querySelector(".register-wrapper") as HTMLElement;
    if (loginSectionRef) {
      loginSectionRef.classList.remove("hide");
    }

    if (registerSectionRef) {
      registerSectionRef.classList.add("hide");
    }
  }

  return (
    <section className="register-wrapper hide">
      <span className="register__back-to-login" onClick={backToLogin}>
        Back to login
      </span>
      <form className="register-form">
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
        />
        <input
          type="text"
          aria-label="Password"
          placeholder="Password"
          className="register-inputField"
        />
        <input
          type="text"
          aria-label="Confirm password"
          placeholder="Confirm password"
          className="register-inputField"
        />
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
