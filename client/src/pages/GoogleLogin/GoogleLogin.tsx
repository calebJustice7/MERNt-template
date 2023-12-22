import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useGetGoogleRedirect } from "../../queries/Auth";
import { Link } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();
  const authQuery = useAuth();
  const query = useGetGoogleRedirect();

  useEffect(() => {
    if (authQuery.data && !authQuery.isLoading && !authQuery.isFetching) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authQuery.data]);

  return (
    <div className="h-screen flex justify-center items-center">
      {query.data && (
        <Link to={query.data || ""}>
          <button className="btn btn-primary" disabled={!query.data || authQuery.isLoading}>
            Login With Google
          </button>
        </Link>
      )}
    </div>
  );
}

export default GoogleLogin;
