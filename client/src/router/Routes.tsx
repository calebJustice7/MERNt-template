import { Routes as Router, Route } from "react-router-dom";
import GoogleLogin from "../pages/GoogleLogin";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<GoogleLogin />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Routes;
