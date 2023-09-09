import { Outlet } from "react-router-dom";

import Header from "../components/universal/Header.jsx";
import Footer from "../components/universal/Footer.jsx";

const NonSubNavLayout = () => {
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

export default NonSubNavLayout;
