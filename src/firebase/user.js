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
            userObj.userId = doc.data().userId;
            userObj.userName = doc.data().userName;
        });

        console.log(userObj);

        return userObj;
    } catch (error) {
        console.log("Error fetching user data: " + error);
    }
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

export { createUser, getUserData, userExists };
