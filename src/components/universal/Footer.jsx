import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__credits">Filler</div>

                <nav className="site-footer__navigation">
                    <ul>
                        <li>
                            <Link to="/">Test</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
