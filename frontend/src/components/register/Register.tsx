import "./Register.css";
import { handleClose } from "../../Utils/handleClose/HandleClose";

function Register() {
  return (
    <section className="register-wrapper hide">
      <form className="register-form">
        <input
          className="register-inputField"
          type="text"
          aria-label="Username"
          placeholder="Username"
        />
        <input
          className="register-inputField"
          type="text"
          aria-label="Password"
          placeholder="Password"
        />
        <input
          className="register-inputField"
          type="text"
          aria-label="Confirm password"
          placeholder="Confirm password"
        />
        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
      <p
        className="login__close-btn"
        onClick={() => handleClose(".register-wrapper", ".app > section:first-child")}
      >
        X
      </p>
    </section>
  );
}

export default Register;

// Författare Adréan
