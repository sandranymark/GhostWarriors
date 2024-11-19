import "./App.css";
import Login from "./components/login/Login";
import Routers from "./routers/Routers";

function App() {
  return (
    <div className="app">
      <Routers />
      <Login />
    </div>
  );
}

export default App;
