import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import SubRipplesNav from "../feed/SubRipplesNav.jsx";

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main className="site-main">
                <div className="site-main__inner">
                    <SubRipplesNav />
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
