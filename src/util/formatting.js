const formatUserData = (user) => {
    console.log(user);
    return {
        userId: user.uid,
        userEmail: user.email,
        userName: trimEmail(user.email),
    };
};

const trimEmail = (email) => {
    return email.split("@")[0];
};

export { formatUserData };
