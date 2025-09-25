import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import { useUser } from "./context/useUser";

export default function App() {
  const { user } = useUser();
  const isAdmin = user?.role === "admin";
  return (
    <div className="text-foreground min-h-screen w-full px-10">
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/dashboard"
          element={isAdmin ? <Admin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to={"/login"} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
