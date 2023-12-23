import { Link } from "react-router-dom";
import { useGetUsers } from "../../queries/User";

function Home() {
  const query = useGetUsers();

  console.log(query.data);

  return (
    <>
      <div>Hell ofrom home</div>
      <Link to="/profile">Profile Page</Link>
    </>
  );
}

export default Home;
