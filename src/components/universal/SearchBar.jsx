import "./SearchBar.scss";

const SearchBar = () => {
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

    return (
        <div className="site-search-bar">
            <button className="site-search-bar__toggle" onClick={toggleSearchForm} type="button">
                <i className="fas fa-search"></i>
                <span className="screen-reader-text">Toggle Search</span>
            </button>

            <form className="site-search-bar__form">
                <label htmlFor="search">
                    <input
                        id="search"
                        name="search"
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
