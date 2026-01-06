import ShopPage from "./pages/Home";
import LandingPage from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SuccessPage from "./pages/sucess";
import CheckoutLoader from "./components/CheckoutLoader";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="text-sm"
      />
      <CheckoutLoader />
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/shop" Component={ShopPage} />
        <Route path="/success" Component={SuccessPage} />
      </Routes>
    </main>
  );
}

export default App;
