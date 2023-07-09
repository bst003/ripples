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
      </label>
      <button type="submit">
        <span className="screen-reader-text">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
