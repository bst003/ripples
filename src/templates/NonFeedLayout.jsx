// import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import Header from "../components/universal/Header.jsx";
import Footer from "../components/universal/Footer.jsx";
// import SubRipplesNav from "../components/feed/SubRipplesNav.jsx";
// import AddPost from "../components/feed/add-post/AddPost.jsx";
// import SubRipplesContext from "../components/feed/SubRipplesContext.jsx";

// import { getForums } from "../firebase/forum";

const NonFeedLayout = () => {
    return (
        <div>
            <Header />
            <main className="site-main padded">
                <div className="site-main__inner">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NonFeedLayout;
