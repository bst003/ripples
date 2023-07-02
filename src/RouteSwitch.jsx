import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { userExists } from "./firebase/authentication.js";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import MainLayout from "./templates/MainLayout.jsx";

import Home from "./views/Home.jsx";
import SubRipple from "./views/SubRipple.jsx";
import Profile from "./views/Profile.jsx";
import NotFound from "./views/NotFound.jsx";

const RouteSwitch = () => {
  const [user, setUser] = useState(null);

  const initAuthListener = async () => {
    onAuthStateChanged(getAuth(), async (authUser) => {
      if (authUser) {
        console.log(authUser);
        const user = await userExists(authUser.uid);
        if (user) {
          console.log("this works");
        }
        setUser(authUser);
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
      {user ? user.displayName : "no user"}
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
