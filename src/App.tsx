import HomePage from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import { ToastContainer } from "react-toastify";
import SuccessPage from "./pages/sucess";
function App() {
  return (
    <main>
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signup" Component={RegisterForm} />
        <Route path="/login" Component={LoginForm} />
        <Route path="/success" Component={SuccessPage} />
      </Routes>
    </main>
  );
}

export default App;
