import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li key="home">
          <Link to="/">Home</Link>
        </li>
        <li key="entertainment ">
          <Link to="/entertainment">Entertainment</Link>
        </li>
        <li key="business">
          <Link to="/business">Business</Link>
        </li>
        <li key="technology">
          <Link to="/technology">Technology</Link>
        </li>
        <li key="sports">
          <Link to="/sports">Sports</Link>
        </li>
      </ul>
    </nav>
  );
}
