import PropTypes from "prop-types";
/*

Need to pass following properties
    - content
    - postId (prop)
    - userGoogleId (prop)

*/

const PostAddCommentForm = (props) => {
    const { id, userGoogleId } = props;

    const submitCommentForm = () => {
        console.log(id);
        console.log(userGoogleId);
    };

    return (
        <form className="pc__add-comment-form" onSubmit={submitCommentForm}>
            <div className="form-field">
                <label htmlFor="post-comment">Comment</label>
                <textarea id="post-comment" name="post-comment" maxLength="500" required></textarea>
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
};

export default PostAddCommentForm;
