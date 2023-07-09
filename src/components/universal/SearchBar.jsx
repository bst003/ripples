import "./SearchBar.scss";

const SearchBar = () => {
    return (
        <form className="site-search-bar">
            <label htmlFor="search">
                <input
                    id="search"
                    name="search"
                    className="search-input"
                    type="text"
                    placeholder="Search Posts"
                />
                <button type="submit">
                    <i className="fas fa-search"></i>
                    <span className="screen-reader-text">Search</span>
                </button>
            </label>
        </form>
    );
};

export default SearchBar;
