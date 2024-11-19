import "./Register.css";

function Register() {
  return (
    <form className="form-register">
      <input className="inputField" type="text" aria-label="Username" />
      <input className="inputField" type="text" aria-label="Password" />
      <input className="inputField" type="text" aria-label="Confirm password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
