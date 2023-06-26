import { Outlet } from "react-router-dom";
import Header from "../parts/Header.jsx";
import Footer from "../parts/Footer.jsx";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="site-main">
        <div className="site-main__inner">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
