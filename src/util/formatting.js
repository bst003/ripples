const formatUserData = (user) => {
    console.log(user);
    return {
        googleId: user.uid,
        userEmail: user.email,
        userName: trimEmail(user.email),
        userPic: user.photoURL,
    };
};

const trimEmail = (email) => {
    return email.split("@")[0];
};

export { formatUserData };
