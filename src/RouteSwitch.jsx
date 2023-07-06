import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createUser, getUserData, userExists } from "./firebase/user.js";

import { formatUserData } from "./util/formatting.js";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import MainLayout from "./components/universal/MainLayout.jsx";

import Home from "./views/Home.jsx";
import SubRipple from "./views/SubRipple.jsx";
import Profile from "./views/Profile.jsx";
import NotFound from "./views/NotFound.jsx";

const RouteSwitch = () => {
  const [user, setUser] = useState(null);

  const initAuthListener = async () => {
    onAuthStateChanged(getAuth(), async (authUser) => {
      if (authUser) {
        const user = await userExists(authUser.uid);

        // If user does not exist in DB add one
        if (!user) {
          const formattedUserData = formatUserData(authUser);
          createUser(formattedUserData);
        }

        const userData = await getUserData(authUser.uid);

        setUser(userData);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <>
      {user ? user.userName : "no user"}
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/r/:slug" element={<SubRipple />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteSwitch;
