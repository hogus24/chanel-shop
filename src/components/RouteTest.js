import { Link } from "react-router-dom";
const RouteTest = () => {
  return (
    <div>
      {/* to={"/"} <- 작성된 경로와 똑같이 작성해야함 */}
      <Link to={"/"}>HOME</Link> <br />
      <Link to={"/new"}>New</Link>
      <br />
      <Link to={"/diary"}>Diary</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
      <br />
    </div>
  );
};
export default RouteTest;
