import { useContext } from "react";

import SubRipplesContext from "../SubRipplesContext";

const AddPostForm = () => {
    const subRipples = useContext(SubRipplesContext);

    const populateSubRipplesInput = () => {
        const subRipplesArr = [];

        if (subRipples) {
            subRipples.map((subRipple) => {
                const option = (
                    <option key={subRipple.id} value={subRipple.slug}>
                        {subRipple.labek}
                    </option>
                );
                subRipplesArr.push(option);
            });
        }

        console.log(subRipplesArr);

        return subRipplesArr;
    };

    const submitPost = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={submitPost}>
            <div className="form-field">
                <label>What Sub Ripple are you posting to?</label>
                <select>{populateSubRipplesInput()}</select>
            </div>

            <div className="form-field">
                <label htmlFor="post-title">Post Title</label>
                <input id="post-title" name="post-title" type="text" />
            </div>

            <div className="form-field">
                <label htmlFor="post-content">Post Content</label>
                <textarea id="post-content" name="post-content"></textarea>
            </div>
        </form>
    );
};

export default AddPostForm;
