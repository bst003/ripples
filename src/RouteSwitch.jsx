import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initAuthListener } from "./firebase/authentication.js";

import MainLayout from "./templates/MainLayout.jsx";
import NonSubNavLayout from "./templates/NonSubNavLayout.jsx";
import UserContext from "./components/universal/UserContext.jsx";

import Home from "./views/Home.jsx";
import About from "./views/About.jsx";
import SubRipple from "./views/SubRipple.jsx";
import SinglePost from "./views/SinglePost.jsx";
import Search from "./views/Search.jsx";
import Profile from "./views/Profile.jsx";
import NotFound from "./views/NotFound.jsx";

const RouteSwitch = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        initAuthListener(setUser);
    }, []);

    return (
        <>
            <UserContext.Provider value={user}>
                <BrowserRouter basename="/ripples">
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/r/:slug" element={<SubRipple />} />
                        </Route>

                        <Route element={<NonSubNavLayout />}>
                            <Route path="/profile/:username" element={<Profile />} />
                            <Route path="/post/:id" element={<SinglePost />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/search/:searchParam" element={<Search />} />
                            <Route path="/about" element={<About />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
};

export default RouteSwitch;
