import { useContext } from "react";

import UserContext from "./../../universal/UserContext";

import { Link } from "react-router-dom";

import "./PostControls.scss";

/*

Options needed
    - Delete post (if logged in)
    - Comment
    - Single Post View

Pass in user ID of person who made post.

Compare to user context 

*/

const PostControls = (props) => {
    const { id, userGoogleId } = props;

    const userData = useContext(UserContext);

    const deleteButtonContent = () => {
        if (userData.googleId === userGoogleId) {
            return (
                <button className="control-button" type="button">
                    <i className="fa-solid fa-trash"></i>
                </button>
            );
        }
    };

    const controlContent = () => {
        if (userData) {
            return (
                <>
                    <button className="control-button" type="button">
                        <i className="fa-solid fa-comment"></i>
                    </button>
                    <Link className="control-button" to={"/post/" + id}>
                        <i className="fa-solid fa-expand"></i>
                    </Link>
                    {deleteButtonContent()}
                </>
            );
        }
    };

    return <div className="pc__controls">{controlContent()}</div>;
};

export default PostControls;
