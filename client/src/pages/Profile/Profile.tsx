import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../queries/Auth";
import { useQueryClient } from "@tanstack/react-query";

function Profile() {
  const { logout } = useContext(AuthContext);
  const query = useLogout();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutUser = async () => {
    await query.mutateAsync();
    queryClient.removeQueries({ queryKey: ["auth"] });
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="text-7xl bg-success text-black">Profile Page</div>
      <Link to="/">Home Page</Link>
      <button className="btn btn-primary" onClick={logoutUser}>
        Logout
      </button>
    </>
  );
}

export default Profile;
