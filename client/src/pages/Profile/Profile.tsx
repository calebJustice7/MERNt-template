import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <>
      <div className="text-7xl bg-success text-black">Profile Page</div>
      <Link to="/">Home Page</Link>
    </>
  );
}

export default Profile;
