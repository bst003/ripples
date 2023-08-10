import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import SubRipplesContext from "../SubRipplesContext";

import UserContext from "../../universal/UserContext";

import { submitPost } from "../../../firebase/post";

const AddPostForm = (props) => {
    const { closeModal } = props;

    const navigate = useNavigate();

    const subRipples = useContext(SubRipplesContext);

    const userData = useContext(UserContext);

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
                    <option key={subRipple.id} value={subRipple.id}>
                        {subRipple.label}
                    </option>
                );
                subRipplesArr.push(option);
            });
        }

        console.log(subRipplesArr);

        return subRipplesArr;
    };

    const formFieldsValid = (subRipple, title, content) => {
        let valid = true;

        if (subRipple.value == "null") {
            valid = false;
            subRipple.nextSibling.innerText = "Please select a value";
            console.log("display select error");
        }

        if (!title.value) {
            valid = false;
            title.nextSibling.innerText = "Please enter a post title";
            console.log("display title error");
        }

        console.log(content);
        // if (!content.value) {
        //     valid = false;
        //     console.log("display content error");
        // }

        return valid;
    };

    const clearFormMessages = (form) => {
        const fieldErrors = form.querySelectorAll(".error-msg");
        const formError = form.querySelector(".form-error-msg");

        fieldErrors.forEach((fieldError) => {
            fieldError.innerText = "";
        });

        formError.innerText = "";
    };

    const submitPostForm = async (e) => {
        e.preventDefault();
        console.log(e);
        const form = e.target;

        const subRipple = form.querySelector("#sub-ripple");
        const title = form.querySelector("#post-title");
        const content = form.querySelector("#post-content");

        // const subRippleVal = subRipple.value;
        // const titleVal = title.value;
        // const contentVal = content.value;

        if (!formFieldsValid(subRipple, title, content)) {
            console.log("show errors");
            return;
        }
        const postObj = {
            title: title.value,
            forumId: subRipple.value,
            userGoogleId: userData.googleId,
            content: content.value,
        };

        console.log(postObj);

        console.log("submit form and get response");
        const postSubmittedId = await submitPost(postObj);
        if (postSubmittedId) {
            console.log("clear fields");
            clearFormMessages(form);
            console.log("close modal");
            closeModal();
            navigate("/post/" + postSubmittedId);
        } else {
            console.log("show form alert");
            const formError = form.querySelector(".form-error-msg");

            formError.innerText =
                "There was an issue submitting the form, please try again in a few minutes";
        }
    };

    return (
        <form className="add-post-form" onSubmit={submitPostForm}>
            <div className="form-field">
                <label htmlFor="sub-ripple">
                    What Sub Ripple are you posting to? <span className="required">(Required)</span>
                </label>
                <select id="sub-ripple" name="sub-ripple" required>
                    {populateSubRipplesInput()}
                </select>
                <span className="error-msg"></span>
            </div>

            <div className="form-field">
                <label htmlFor="post-title">
                    Post Title <span className="required">(Required)</span>
                </label>
                <input id="post-title" name="post-title" type="text" required />
                <span className="error-msg"></span>
            </div>

            <div className="form-field">
                <label htmlFor="post-content">Post Content</label>
                <textarea id="post-content" name="post-content" maxLength="500"></textarea>
            </div>

            <div className="form-field form-footer">
                <button className="btn-el" type="submit">
                    Submit
                </button>
            </div>

            <span className="form-error-msg"></span>
        </form>
    );
};

AddPostForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default AddPostForm;
