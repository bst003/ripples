import { useContext } from "react";

import SubRipplesContext from "../SubRipplesContext";

const AddPostForm = () => {
    const subRipples = useContext(SubRipplesContext);

    const populateSubRipplesInput = () => {
        const subRipplesArr = [];

        subRipplesArr.push(
            <option key="00000001" defaultValue value>
                {" "}
                -- select an option --{" "}
            </option>
        );

        if (subRipples) {
            subRipples.map((subRipple) => {
                const option = (
                    <option key={subRipple.id} value={subRipple.slug}>
                        {subRipple.label}
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
        <form className="add-post-form" onSubmit={submitPost}>
            <div className="form-field">
                <label htmlFor="sub-ripple">
                    What Sub Ripple are you posting to? <span className="required">(Required)</span>
                </label>
                <select id="sub-ripple" name="sub-ripple">
                    {populateSubRipplesInput()}
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="post-title">
                    Post Title <span className="required">(Required)</span>
                </label>
                <input id="post-title" name="post-title" type="text" />
            </div>

            <div className="form-field">
                <label htmlFor="post-content">Post Content</label>
                <textarea id="post-content" name="post-content"></textarea>
            </div>

            <div className="form-field form-footer">
                <button className="btn-el" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AddPostForm;
