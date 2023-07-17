import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { collection, getFirestore, getDocs, query } from "firebase/firestore/lite";

import "./SubRipplesNav.scss";

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
                        id: doc.id,
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
                <div className="sub-ripples-nav">
                    <button className="sub-ripples-nav__toggle btn-el" type="button">
                        Communities <i className="fa-solid fa-bars"></i>
                    </button>

                    <ul className="sub-ripples-nav__list">
                        <li>
                            <Link className="btn-el" to="/">
                                Home
                            </Link>
                        </li>
                        {subRipples.map((subRippleItem) => {
                            return (
                                <li key={subRippleItem.id}>
                                    <Link className="btn-el" to={"/r/" + subRippleItem.slug}>
                                        {subRippleItem.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <>Loading</>
            )}
        </nav>
    );
};

export default SubRipplesNav;
