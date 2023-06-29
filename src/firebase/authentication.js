import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

const authStateObserver = () => {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    console.log("user is signed in");
  } else {
    console.log("not signed in");
  }
};

const initFirebaseAuth = () => {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
};

export { initFirebaseAuth, signInUser, signOutUser };
