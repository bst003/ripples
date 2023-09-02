const _trimEmail = (email) => {
    return email.split("@")[0];
};

const formatUserData = (user) => {
    console.log(user);
    return {
        googleId: user.uid,
        userEmail: user.email,
        userName: _trimEmail(user.email),
        userPic: user.photoURL,
    };
};

const _splitByWhiteSpace = (content) => {
    const contentArr = content.split("\n");
    return contentArr;
};

const formatContentIntoPara = (content) => {
    const contentArr = _splitByWhiteSpace(content);

    const paraContent = contentArr.map((para, index) => {
        if (para !== "") {
            return <p key={index}>{para}</p>;
        }
    });

    return paraContent;
};

export { formatUserData, formatContentIntoPara };
