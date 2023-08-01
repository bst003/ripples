import { collection, getFirestore, getDocs, query, where } from "firebase/firestore/lite";

const getForum = async (setForumState, subRippleId = null, subRippleSlug = null) => {
    try {
        let forumQuery;

        if (subRippleSlug) {
            forumQuery = query(
                collection(getFirestore(), "forums"),
                where("slug", "==", subRippleSlug)
            );
        }

        if (subRippleId) {
            forumQuery = query(
                collection(getFirestore(), "forums"),
                where("__name__", "==", subRippleId)
            );
        }

        // const forumQuery = query(collection(getFirestore(), "forums"), slugQuery, idQuery);

        const forumQuerySnapshot = await getDocs(forumQuery);

        const forumObj = {};
        forumQuerySnapshot.forEach((doc) => {
            console.log(doc.data());

            forumObj.id = doc.id;
            forumObj.label = doc.data().label;
            forumObj.slug = doc.data().slug;
        });

        setForumState(forumObj);
    } catch (error) {
        console.log("Error fetching forum: " + error);
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
