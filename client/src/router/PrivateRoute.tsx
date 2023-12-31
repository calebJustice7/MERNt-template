import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../queries/Auth";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import MainLayout from "../Layouts/MainLayout";

const PrivateRoute = () => {
  const [status, setStatus] = useState<"loading" | "unknown_error" | "success" | "bad_token" | "permission_denied">(
    "loading",
  );
  const { logout, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const location = useLocation();
  const query = useAuth();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["auth"] });
    // setUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (query.isLoading) setStatus("loading");
    else if (query.data && !query.error) {
      setStatus("success");
      localStorage.removeItem("redirect");
      setUser(query.data);
    } else if (query.error && axios.isAxiosError(query.error)) {
      localStorage.setItem("redirect", location.pathname);
      if (query.error.response?.status === 401) {
        setStatus("bad_token");
        logout();
      } else if (query.error.response?.status === 403) {
        setStatus("permission_denied");
      } else setStatus("unknown_error");
    } else if (query.error) {
      setStatus("unknown_error");
      localStorage.setItem("redirect", location.pathname);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (status === "loading") return "Fetching User";
  else if (status === "unknown_error") return "Unknown error";
  else if (status === "success")
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  else if (status === "bad_token") return <Navigate to="/login" />;
  else if (status === "permission_denied") return <Navigate to="/" />;
};

export default PrivateRoute;
