import { Outlet } from "react-router-dom";
import Header from "../components/universal/Header.jsx";
import Footer from "../components/universal/Footer.jsx";
import SubRipplesNav from "../components/feed/SubRipplesNav.jsx";
import AddPostBtn from "../components/feed/AddPostBtn.jsx";

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main className="site-main">
                <div className="site-main__inner">
                    <SubRipplesNav />
                    <AddPostBtn />
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
