import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./question.css";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { selectUser } from '../../features/userSlice';
import { useNavigate } from "react-router-dom";

const Question = () => {
    const user = useSelector(selectUser);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tag, setTag] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleQuill = (value) => {
        setBody(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title !== "" && body !== "") {
            setLoading(true)
            const bodyJSON = {
                title: title,
                body: body,
                tag: JSON.stringify(tag),
                user: user,
            };
            await axios
                .post("/api/question", bodyJSON)
                .then((res) => {

                    alert("Question added successfully");
                    navigate("/");
                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err);
                });
        }
    };
    return (
        <div className="add-question">
            <div className="add-question-container">
                <div className="head-title">
                    <h1>Ask a public question</h1>
                </div>
                <div className="question-container">
                    <div className="question-options">
                        <div className="question-option">
                            <div className="title">
                                <h3>Title</h3>
                                <small>
                                    Be specific and imagine you’re asking a question to another
                                    person
                                </small>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                                />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Body</h3>
                                <small>
                                    Include all the information someone would need to answer your
                                    question
                                </small>
                                <ReactQuill
                                    value={body}
                                    onChange={handleQuill}
                                    // modules={Editor.modules}
                                    className="react-quill"
                                    theme="snow"
                                />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Tags</h3>
                                <small>
                                    Add up to 3 tags to describe what your question is about
                                </small>


                                <TagsInput
                                    value={tag}
                                    onChange={setTag}
                                    name="topics"
                                    placeHolder="press enter to add new tag"
                                />


                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={handleSubmit} className="button" disabled={loading}>
                    {loading ? 'adding your question' : ' Add your question'}
                </button>
            </div>
        </div>
    );
}
export default Question
