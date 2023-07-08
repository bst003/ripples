import { Link } from "react-router-dom";
import AccountNav from "./AccountNav.jsx";
import SearchBar from "./SearchBar.jsx";

import logo from "../../assets/media/logo.png";

import "./Header.scss";

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-logo">
          <Link to="/">
            <img src={logo} alt="site logo" />
            Ripples
          </Link>
        </div>

        <SearchBar />
        <AccountNav />
      </div>
    </header>
  );
};

export default Header;
