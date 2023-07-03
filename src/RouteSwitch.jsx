import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { userExists } from "./firebase/authentication.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore/lite";
import { getDatabase } from "firebase/database";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import MainLayout from "./templates/MainLayout.jsx";

import Home from "./views/Home.jsx";
import SubRipple from "./views/SubRipple.jsx";
import Profile from "./views/Profile.jsx";
import NotFound from "./views/NotFound.jsx";

const RouteSwitch = () => {
  const [user, setUser] = useState(null);

  const trimEmail = (email) => {
    return email.split("@")[0];
  };

  const formatUserData = (user) => {
    return {
      userId: user.uid,
      username: trimEmail(user.email),
    };
  };

  const createUser = async (userObj) => {
    try {
      await addDoc(collection(getFirestore(), "users"), {
        ...userObj,
        timestamp: serverTimestamp(),
      });

      //   const db = getDatabase();
      //   await setDoc(doc(db, "user"), {
      //     ...userObj,
      //     timestamp: serverTimestamp(),
      //   });
    } catch (error) {
      console.error("Error saving user to Firebase Database", error);
    }
  };

  const initAuthListener = async () => {
    onAuthStateChanged(getAuth(), async (authUser) => {
      if (authUser) {
        console.log(authUser);
        const user = await userExists(authUser.uid);
        console.log("post user check");

        const userName = trimEmail(authUser.email);
        console.log(userName);

        if (user) {
          console.log("this works");
        } else {
          console.log("this is a new user");
          const formattedUserData = formatUserData(authUser);
          console.log(formattedUserData);
          createUser(formattedUserData);
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
