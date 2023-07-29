import { collection, getFirestore, getDocs, query, where } from "firebase/firestore/lite";

const getForum = async (subRippleId = null, setForumState) => {
    try {
        const forumQuery = query(
            collection(getFirestore(), "forums"),
            where("__name__", "==", subRippleId)
        );

        const forumQuerySnapshot = await getDocs(forumQuery);

        const forumObj = {};
        forumQuerySnapshot.forEach((doc) => {
            forumObj.label = doc.data().label;
            forumObj.slug = doc.data().slug;
        });

        setForumState(forumObj);
    } catch (error) {
        console.log("Error fetching forums: " + error);
    }
};

const getForums = async (setForumsState) => {
    try {
        const forumsQuery = query(collection(getFirestore(), "forums"));

        const forumsQuerySnapshot = await getDocs(forumsQuery);

        const forumsArr = [];
        forumsQuerySnapshot.forEach((doc) => {
            const forumObj = {
                id: doc.id,
                label: doc.data().label,
                slug: doc.data().slug,
            };

            forumsArr.push(forumObj);
        });

        setForumsState(forumsArr);
    } catch (error) {
        console.log("Error fetching forums: " + error);
    }
};

export { getForum, getForums };
