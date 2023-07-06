import { createUser, getUserData, userExists } from "../firebase/user.js";

import { formatUserData } from "../util/formatting.js";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

/*

How to organize authentication and user functions
  - Only auth functions in this file and user fetching/organization functions in their own file?
    - Should firebase querying be in a separate file from helper functions like the user organizaton files?

*/

const signInUser = async () => {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

// Signs-out of Friendly Chat.
const signOutUser = () => {
  // Sign out of Firebase.
  signOut(getAuth());
};

// Returns the signed-in user's profile Pic URL.
// function getProfilePicUrl() {
//   return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
// }

// Returns the signed-in user's display name.
// function getUserName() {
//   return getAuth().currentUser.displayName;
// }

const initAuthListener = async (setUserState) => {
  onAuthStateChanged(getAuth(), async (authUser) => {
    if (authUser) {
      const user = await userExists(authUser.uid);

      // If user does not exist in DB add one
      if (!user) {
        const formattedUserData = formatUserData(authUser);
        createUser(formattedUserData);
      }

      const userData = await getUserData(authUser.uid);

      setUserState(userData);
    } else {
      setUserState(null);
    }
  });
};

export { initAuthListener, signInUser, signOutUser };
