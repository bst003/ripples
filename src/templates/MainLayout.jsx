import { Outlet } from "react-router-dom";
import Header from "../components/universal/Header.jsx";
import Footer from "../components/universal/Footer.jsx";
import SubRipplesNav from "../components/feed/SubRipplesNav.jsx";
import AddPost from "../components/feed/add-post/AddPost.jsx";

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main className="site-main">
                <div className="site-main__inner">
                    <SubRipplesNav />
                    <AddPost />
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
