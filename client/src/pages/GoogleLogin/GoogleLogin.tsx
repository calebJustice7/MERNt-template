import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetGoogleRedirect } from "../../queries/Auth";
import { Link } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const query = useGetGoogleRedirect();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="h-screen flex justify-center items-center">
      {query.data && (
        <Link to={query.data || ""}>
          <button className="btn btn-primary" disabled={!query.data}>
            Login With Google
          </button>
        </Link>
      )}
    </div>
  );
}

export default GoogleLogin;
