import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-logo h2">
          <Link to="/">Ripples</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
