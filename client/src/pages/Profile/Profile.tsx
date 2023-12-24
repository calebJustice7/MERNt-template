import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Can } from "../../context/AbilityContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>{user?.email}</div>
      <Can I="read" a="user">
        Yes you can
      </Can>
    </>
  );
}

export default Profile;
