import "./App.css";
import Login from "./components/login/Login";
import { CartProvider } from "./context/CartContext";
import Routers from "./routers/Routers";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Routers />
        <Login />
      </div>
    </CartProvider>
  );
}

export default App;
