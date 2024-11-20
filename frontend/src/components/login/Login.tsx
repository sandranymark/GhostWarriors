import "./Login.css";
import { RxAvatar } from "react-icons/rx";

function Login() {
  function handleRegister(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    const registerSectionRef = document.querySelector(".register-wrapper") as HTMLElement;
    if (loginSectionRef) {
      loginSectionRef.classList.add("hide");
      registerSectionRef.classList.remove("hide");
    }
  }

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

  return (
    <section className="login-wrapper hide">
      <RxAvatar className="login-avatar" />
      <form className="login-form">
        <div className="login-container">
          <input
            className="login-inputField"
            type="text"
            aria-label="Username"
            placeholder="Username"
          />
          <input
            className="login-inputField"
            type="text"
            aria-label="Password"
            placeholder="Password"
          />
          <span className="login__button-wrapper">
            <button type="submit" className="login-btn">
              Login
            </button>
            <button onClick={(e) => handleRegister(e)} type="submit" className="register-btn">
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
}

export default Login;

// Författare Adréan
