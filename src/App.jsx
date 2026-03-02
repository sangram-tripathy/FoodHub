import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OrderHistory from "./components/OrderHistory";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { AuthContextProvider } from "./store/AuthContext";
import { ToastProvider } from "./store/ToastContext";

function App() {
  return (
    <ToastProvider>
      <AuthContextProvider>
        <UserProgressContextProvider>
          <CartContextProvider>
            <Header />
            <Meals />
            <Cart/>
            <Checkout />
            <Login />
            <Signup />
            <OrderHistory />
          </CartContextProvider>
        </UserProgressContextProvider>
      </AuthContextProvider>
    </ToastProvider>
  );
}

export default App;
