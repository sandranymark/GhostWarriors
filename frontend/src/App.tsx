import "./App.css";
import Login from "./components/login/Login";
import { CartProvider } from "./context/CartContext";
import Register from "./components/register/Register";
import Routers from "./routers/Routers";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Routers />
        <Login />
        <Register />
      </div>
    </CartProvider>
  );
}

export default App;

// Författare Adréan

// Modifierad Anton <CartProvider>
