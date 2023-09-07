import Feed from "../components/feed/Feed";

const Search = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchQuery = urlParams.get("s");

    const mainContent = () => {
        if (!searchQuery) {
            return <p>Please use the header to search for a post.</p>;
        } else {
            return <Feed searchQuery={searchQuery} />;
        }
    };

    const titleContent = () => {
        if (!searchQuery) {
            return "Search";
        }

        return 'Search results for: "' + searchQuery + '"';
    };

    return (
        <div>
            <h1>{titleContent()}</h1>
            {mainContent()}
        </div>
    );
};

export default Search;
