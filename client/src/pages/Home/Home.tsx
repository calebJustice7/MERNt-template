import { Link } from "react-router-dom";
import { Can } from "../../context/AbilityContext";

function Home() {
  return (
    <>
      <div>Hell ofrom home</div>
      <Can I="read" a="user">
        Yes you can
      </Can>
      <Link to="/profile">Profile Page</Link>
    </>
  );
}

export default Home;
