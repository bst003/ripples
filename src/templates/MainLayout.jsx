import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import Header from "../components/universal/Header.jsx";
import Footer from "../components/universal/Footer.jsx";
import SubRipplesNav from "../components/feed/SubRipplesNav.jsx";
import AddPost from "../components/feed/add-post/AddPost.jsx";
import SubRipplesContext from "../components/feed/SubRipplesContext.jsx";

import { getForums } from "../firebase/forum";

const MainLayout = () => {
    const [subRipples, setSubRipples] = useState([]);

    useEffect(() => {
        getForums(setSubRipples);
    }, []);

    return (
        <div>
            <Header />
            <main className="site-main">
                <div className="site-main__inner">
                    <SubRipplesContext.Provider value={subRipples}>
                        <SubRipplesNav />
                        <AddPost />
                        <Outlet />
                    </SubRipplesContext.Provider>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
