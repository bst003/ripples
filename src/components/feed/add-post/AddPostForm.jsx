import { useContext } from "react";

import SubRipplesContext from "../SubRipplesContext";

const AddPostForm = () => {
    const subRipples = useContext(SubRipplesContext);

    const populateSubRipplesInput = () => {
        const subRipplesArr = [];

        subRipplesArr.push(
            <option key="00000001" defaultValue value="null">
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

    const formFieldsValid = (subRippleVal, titleVal, contentVal) => {
        let valid = true;

        if (subRippleVal == "null") {
            valid = false;
            console.log("display select error");
        }

        if (!titleVal) {
            valid = false;
            console.log("display title error");
        }

        if (!contentVal) {
            valid = false;
            console.log("display content error");
        }

        return valid;
    };

    const submitPost = (e) => {
        e.preventDefault();
        console.log(e);
        const form = e.target;

        const subRipple = form.querySelector("#sub-ripple");
        const title = form.querySelector("#post-title");
        const content = form.querySelector("#post-content");

        const subRippleVal = subRipple.value;
        const titleVal = title.value;
        const contentVal = content.val;

        if (!formFieldsValid(subRippleVal, titleVal, contentVal)) {
            console.log("show errors");
            return;
        }

        console.log("submit form and get response");
        console.log("clear fields");
        console.log("close modal");
    };

    return (
        <form className="add-post-form" onSubmit={submitPost}>
            <div className="form-field">
                <label htmlFor="sub-ripple">
                    What Sub Ripple are you posting to? <span className="required">(Required)</span>
                </label>
                <select id="sub-ripple" name="sub-ripple" required>
                    {populateSubRipplesInput()}
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="post-title">
                    Post Title <span className="required">(Required)</span>
                </label>
                <input id="post-title" name="post-title" type="text" required />
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

            <span className="form-error"></span>
        </form>
    );
};

export default AddPostForm;
