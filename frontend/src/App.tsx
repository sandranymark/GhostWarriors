import Routers from "./routers/Routers";
import Login from "./components/login/Login";
import Payment from "./components/payment/Payment";
import { CartProvider } from "./context/CartContext";
import Register from "./components/register/Register";
import { LoginProvider } from "./context/LoginContext";
import PaymentConfirmed from "./components/paymentConfirmed/PaymentConfirmed";

function App() {
  return (
    <CartProvider>
      <LoginProvider>
        <div className="app">
          <Routers />
          <Login />
          <Register />
          <Payment />
          <PaymentConfirmed />
        </div>
      </LoginProvider>
    </CartProvider>
  );
}

export default App;

// Författare Adréan
// Modifierad Anton Sandra
