import PropTypes from "prop-types";

import { submitComment } from "../../../firebase/comment";

import "./PostAddCommentForm.scss";
/*

Need to pass following properties 
    - content
    - postId (prop)
    - userGoogleId (prop)

*/

const PostAddCommentForm = (props) => {
    const { id, userGoogleId, toggleCommentForm, passHandleNewComment } = props;

    const clearFormMessages = (form) => {
        const formError = form.querySelector(".form-error-msg");
        formError.innerText = "";
    };

    const submitCommentForm = async (e) => {
        e.preventDefault();
        const form = e.target;

        const content = form.querySelector("#post-comment");

        const commentObj = {
            postId: id,
            userGoogleId: userGoogleId,
            content: content.value,
        };

        const submittedCommentId = await submitComment(commentObj);
        if (submittedCommentId) {
            console.log("success");
            toggleCommentForm();
            clearFormMessages(form);

            commentObj.id = submittedCommentId;
            commentObj.timestamp = Math.abs(new Date().getTime());

            console.log(commentObj);

            passHandleNewComment(commentObj);
        } else {
            console.log("error");
            const formError = form.querySelector(".form-error-msg");
            formError.innerText =
                "There was an error submitting your comment, please try again in a few minutes.";
        }
    };

    return (
        <form className="pc__add-comment-form" onSubmit={submitCommentForm}>
            <div className="form-field">
                <label htmlFor="post-comment">Comment</label>
                <textarea id="post-comment" name="post-comment" maxLength="300" required></textarea>
            </div>

            <span className="form-error-msg"></span>

            <div className="form-field form-footer">
                <button className="btn-el" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

PostAddCommentForm.propTypes = {
    id: PropTypes.string,
    userGoogleId: PropTypes.string,
    toggleCommentForm: PropTypes.func,
    passHandleNewComment: PropTypes.func,
};

export default PostAddCommentForm;
