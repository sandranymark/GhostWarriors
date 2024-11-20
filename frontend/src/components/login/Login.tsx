import "./Login.css";
import { RxAvatar } from "react-icons/rx";
import { handleClose } from "../../Utils/handleClose/HandleClose";
import { handleRegister } from "../../Utils/handleRegister/handleRegister";

function Login() {
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
      <p
        className="login__close-btn"
        onClick={() => handleClose(".login-wrapper", ".app > section:first-child")}
      >
        X
      </p>
    </section>
  );
}

export default Login;

// Författare Adréan
