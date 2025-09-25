import { Link } from "react-router-dom";
import { useUser } from "../context/useUser";

export default function NavBar() {
  const { user, clearUser } = useUser();
  return (
    <nav className="mt-7 flex w-full items-center justify-between">
      <div className="flex items-center gap-5">
        <img src="/N.jpeg" alt="logo" className="h-15 w-15 rounded-full" />
        <h1 className="text-primary text-xl font-bold">Nova Arrivals</h1>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {user.role === "admin" ? (
              <Link className="text-primary" to={"/dashboard"}>
                Admin Dashboard
              </Link>
            ) : (
              <Link to={"/cart"}>Cart</Link>
            )}
            <p onClick={clearUser} className="cursor-pointer">
              Logout
            </p>
          </>
        ) : null}
      </div>
    </nav>
  );
}
