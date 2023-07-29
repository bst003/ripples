import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getForums } from "../../firebase/forum";

import "./SubRipplesNav.scss";

const SubRipplesNav = () => {
    const [subRipples, setSubRipples] = useState([]);

    useEffect(() => {
        getForums(setSubRipples);
    }, []);

    const toggleSubRipples = (e) => {
        e.preventDefault();

        const toggle = e.currentTarget;
        const subRipplesList = toggle.nextSibling;

        if (toggle.classList.contains("active")) {
            toggle.classList.remove("active");
            subRipplesList.classList.remove("active");
        } else {
            toggle.classList.add("active");
            subRipplesList.classList.add("active");
        }
    };

    return (
        <nav>
            {subRipples.length ? (
                <div className="sub-ripples-nav">
                    <button
                        className="sub-ripples-nav__toggle btn-el"
                        type="button"
                        onClick={toggleSubRipples}
                    >
                        Communities <i className="fa-solid fa-bars"></i>
                    </button>

                    <ul className="sub-ripples-nav__list">
                        <li>
                            <Link className="btn-el" to="/">
                                Home
                            </Link>
                        </li>
                        {subRipples.map((subRippleItem) => {
                            return (
                                <li key={subRippleItem.id}>
                                    <Link className="btn-el" to={"/r/" + subRippleItem.slug}>
                                        {subRippleItem.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <>Loading</>
            )}
        </nav>
    );
};

export default SubRipplesNav;
