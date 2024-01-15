import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Can } from "../../context/AbilityContext";

function NavBar() {
  const { status, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-black">
          <div className="flex-none">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link to="/">App Title</Link>
          </div>
          <div className="flex-none">
            <ul className="flex items-center">
              <Can I="read" a="user">
                <button className="btn mr-7 bg-base-100">
                  <Link to="/profile">Profile</Link>
                </button>
              </Can>
              {status === "authenticated" && (
                <button onClick={logoutUser} className="btn btn-secondary text-secondary-content">
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <li>
            <div>Sidebar Item</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavBar;
