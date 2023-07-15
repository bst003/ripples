import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { collection, getFirestore, getDocs, query } from "firebase/firestore/lite";

const SubRipplesNav = () => {
    const [subRipples, setSubRipples] = useState([]);

    useEffect(() => {
        // initAuthListener(setUser);
        const getSubRipples = async () => {
            try {
                const subRipplesQuery = query(collection(getFirestore(), "forums"));

                const subRipplesQuerySnapshot = await getDocs(subRipplesQuery);

                const subRipplesArr = [];
                subRipplesQuerySnapshot.forEach((doc) => {
                    const timeObj = {
                        id: doc.data().id,
                        label: doc.data().label,
                        slug: doc.data().slug,
                    };

                    subRipplesArr.push(timeObj);
                });

                setSubRipples(subRipplesArr);
            } catch (error) {
                console.log("Error fetching times: " + error);
            }
        };

        getSubRipples();
    }, []);

    return (
        <nav>
            {subRipples.length ? (
                <ol className="leaderboard-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {subRipples.map((subRippleItem) => {
                        return (
                            <li key={subRippleItem.id}>
                                <Link to={"/r/" + subRippleItem.slug}>{subRippleItem.label}</Link>
                            </li>
                        );
                    })}
                </ol>
            ) : (
                <>Loading</>
            )}
        </nav>
    );
};

export default SubRipplesNav;
