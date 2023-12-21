import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Hell ofrom home</div>
      <Link to="/profile">Profile Page</Link>
    </>
  );
}

export default Home;
