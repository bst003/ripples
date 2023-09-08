import { useNavigate } from "react-router-dom";

import "./SearchBar.scss";

const SearchBar = () => {
    const navigateTo = useNavigate();

    const toggleSearchForm = (e) => {
        e.preventDefault();
        const toggle = e.currentTarget;
        const form = toggle.nextElementSibling;

        if (toggle.classList.contains("active")) {
            toggle.classList.remove("active");
            form.classList.remove("active");
        } else {
            toggle.classList.add("active");
            form.classList.add("active");
        }
    };

    const submitSearchForm = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const searchVal = form.querySelector("#s").value;
        navigateTo(`/search/${searchVal}`);
    };

    return (
        <div className="site-search-bar">
            <button className="site-search-bar__toggle" onClick={toggleSearchForm} type="button">
                <i className="fas fa-search"></i>
                <span className="screen-reader-text">Toggle Search</span>
            </button>

            <form onSubmit={submitSearchForm} className="site-search-bar__form">
                <label htmlFor="s">
                    <input
                        id="s"
                        name="s"
                        className="search-input"
                        type="text"
                        placeholder="Search Posts"
                    />
                    <button className="submit" type="submit">
                        <i className="fas fa-search"></i>
                        <span className="screen-reader-text">Search</span>
                    </button>
                </label>
            </form>
        </div>
    );
};

export default SearchBar;
