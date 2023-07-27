import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to="/main">
      <img
        src="images/logo.svg"
        alt="Logo"
        className="hidden md:block cursor-pointer w-12"
      />
      </Link>
    </div>
  );
}

export default Logo;
