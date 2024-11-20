import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Routers from "./routers/Routers";

function App() {
  return (
    <div className="app">
      <Routers />
      <Login />
      <Register />
    </div>
  );
}

export default App;
