import { collection, getFirestore, getDocs, query, where } from "firebase/firestore/lite";

const getForum = async (subRippleId = null, setForumState) => {
    try {
        const postsQuery = query(
            collection(getFirestore(), "forums"),
            where("__name__", "==", subRippleId)
        );

        const postsQuerySnapshot = await getDocs(postsQuery);

        const forumObj = {};
        postsQuerySnapshot.forEach((doc) => {
            console.log(doc.data());

            forumObj.label = doc.data().label;
            forumObj.slug = doc.data().slug;

            console.log(forumObj);
        });

        setForumState(forumObj);
    } catch (error) {
        console.log("Error fetching forums: " + error);
    }
};

export { getForum };
