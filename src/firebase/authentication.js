import { createUser, setUserDataAsState, userExists } from "../firebase/user.js";

import { formatUserData } from "../util/formatting.jsx";

import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
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

const initAuthListener = async (setUserState) => {
    onAuthStateChanged(getAuth(), async (authUser) => {
        if (authUser) {
            console.log(authUser);
            const user = await userExists(authUser.uid);

            // If user does not exist in DB add one
            if (!user) {
                const formattedUserData = formatUserData(authUser);
                await createUser(formattedUserData);
            }

            setUserDataAsState(setUserState, authUser.uid);
        } else {
            setUserState(null);
        }
    });
};

export { initAuthListener, signInUser, signOutUser };
