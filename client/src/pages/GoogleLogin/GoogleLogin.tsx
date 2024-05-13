import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth, useGetGoogleRedirect } from "../../queries/Auth";

function GoogleLogin() {
  const navigate = useNavigate();
  const authQuery = useAuth();
  const query = useGetGoogleRedirect(localStorage.getItem("redirect"));

  useEffect(() => {
    if (authQuery.data && !authQuery.isLoading && !authQuery.isFetching) {
      navigate({ to: "/" });
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
