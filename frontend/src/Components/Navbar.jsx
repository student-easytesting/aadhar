import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link className="link" to="/">
          <span>Home</span>
        </Link>
        <Link className="link" to="/getdata">
          <span>Get Aadhar</span>
        </Link>
        <Link className="link" to="/">
          <span>Admin</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
