import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

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

export { signInUser, signOutUser };
