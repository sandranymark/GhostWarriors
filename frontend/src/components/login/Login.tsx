import "./Login.css";
import { RxAvatar } from "react-icons/rx";

function Login() {
  function handleRegister(): void {}
  function handleClose() {
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    if (!loginSectionRef) {
      return;
    } else {
      loginSectionRef.style.display = "none";
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
            <button onClick={handleRegister} type="submit" className="register-btn">
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
