import {
    collection,
    getFirestore,
    addDoc,
    getDocs,
    limit,
    query,
    where,
    serverTimestamp,
} from "firebase/firestore/lite";

const createUser = async (userObj) => {
    try {
        await addDoc(collection(getFirestore(), "users"), {
            ...userObj,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error saving user to Firebase Database", error);
    }
};

const getUserData = async (userId) => {
    try {
        const userQuery = query(
            collection(getFirestore(), "users"),
            where("googleId", "==", userId),
            limit(1)
        );

        const userQuerySnapshot = await getDocs(userQuery);

        const userObj = {};
        userQuerySnapshot.forEach((doc) => {
            userObj.googleId = doc.data().googleId;
            userObj.userPic = doc.data().userPic;
            userObj.userName = doc.data().userName;
        });

        return userObj;
    } catch (error) {
        console.log("Error fetching user data: " + error);
    }
};

const getUserIdByName = async (userName) => {
    try {
        const userQuery = query(
            collection(getFirestore(), "users"),
            where("userName", "==", userName),
            limit(1)
        );

        const userQuerySnapshot = await getDocs(userQuery);

        let userId;
        userQuerySnapshot.forEach((doc) => {
            userId = doc.data().googleId;
        });

        return userId;
    } catch (error) {
        console.log("Error fetching user data: " + error);
    }
};

const setUserDataAsState = async (setState, userGoogleId) => {
    const data = await getUserData(userGoogleId);

    setState(data);
};

const userExists = async (authId) => {
    console.log(authId);
    try {
        const usersQuery = query(
            collection(getFirestore(), "users"),
            where("googleId", "==", authId)
        );

        const usersQuerySnapshot = await getDocs(usersQuery);

        if (usersQuerySnapshot._docs.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error fetching users: " + error);
    }
};

export { createUser, setUserDataAsState, userExists, getUserIdByName };
