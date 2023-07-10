import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__credits">
                    A project by{" "}
                    <a href="https://github.com/bst003" target="_blank" rel="noreferrer">
                        bst003
                    </a>
                </div>

                <nav className="site-footer__navigation">
                    <ul>
                        <li>
                            <Link to="/">Front Page</Link>
                        </li>
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
