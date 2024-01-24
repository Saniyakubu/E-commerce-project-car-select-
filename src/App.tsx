import HomePage from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signUp" Component={RegisterForm} />
        <Route path="/login" Component={LoginForm} />
      </Routes>
    </main>
  );
}

export default App;
