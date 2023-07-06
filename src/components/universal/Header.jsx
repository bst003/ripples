import { Link } from "react-router-dom";
import AccountNav from "./AccountNav.jsx";

import "./Header.scss";

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-logo h2">
          <Link to="/">Ripples</Link>
        </div>

        <AccountNav />
      </div>
    </header>
  );
};

export default Header;
