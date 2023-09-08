import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Feed from "../components/feed/Feed";

const Search = () => {
    const { searchParam } = useParams();

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setSearchQuery(searchParam);
    }, [searchParam]);

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
