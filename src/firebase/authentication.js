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

const initFirebaseAuth = () => {
  // Listen to auth state changes.
  console.log(getAuth());
  onAuthStateChanged(getAuth(), authStateObserver);
};

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

const userExists = async (authId) => {
  console.log(authId);
  try {
    const usersQuery = query(
      collection(getFirestore(), "users"),
      where("userId", "==", authId)
    );

    const usersQuerySnapshot = await getDocs(usersQuery);
    console.log(usersQuerySnapshot);
    usersQuerySnapshot.forEach((doc) => {
      console.log(doc);
    });

    if (usersQuerySnapshot._docs.length > 0) {
      console.log("a user with this ID exists");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching users: " + error);
  }
};

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

const authStateObserver = (user) => {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    console.log(user);
    console.log(profilePicUrl);
    console.log(userName);
    console.log("user is signed in");
  } else {
    console.log("not signed in");
  }
};

export { initFirebaseAuth, signInUser, signOutUser, userExists };
