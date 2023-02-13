import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import { Avatar } from "@material-ui/core";
import ReactQuill from 'react-quill';
import BookmarkIcon from "@material-ui/icons/Bookmark";
import 'react-quill/dist/quill.snow.css';
import './mainquestion.css'
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { stringAvatar } from "../../utils/Avatar";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";


const MainQuestion = () => {
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("q");
    const [questionData, setQuestionData] = useState([]);
    const [answer, setAnswer] = useState("");
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("");
    const user = useSelector(selectUser);

    const handleQuill = (value) => {
        setAnswer(value);
    };

    useEffect(() => {
        async function getQuestionDetails() {
            await axios
                .get(`/api/question/${id}`)
                .then((res) => setQuestionData(res.data[0]))
                .catch((err) => console.log(err));
        }
        getQuestionDetails();
    }, [id]);

    async function getUpdatedAnswer() {
        await axios
            .get(`/api/question/${id}`)
            .then((res) => {
                console.log(res.data[0])
                setQuestionData(res.data[0])
            })

            .catch((err) => { console.log(err) });
    }

    // console.log(questionData);
    const handleSubmit = async () => {
        if (answer !== '') {
            const body = {
                question_id: id,
                answer: answer,
                user: user,
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios
                .post("/api/answer", body, config)
                .then(() => {
                    alert("Answer added successfully");
                    setAnswer("");
                    getUpdatedAnswer();
                })
                .catch((err) => console.log(err));
        }
    }


    const handleComment = async () => {
        if (comment !== "") {
            const body = {
                question_id: id,
                comment: comment,
                user: user,
            };
            await axios.post(`/api/comment/${id}`, body).then((res) => {
                setComment("");
                setShow(false);
                getUpdatedAnswer();
                // console.log(res.data);
            });
        }

        // setShow(true)
    };
    return (
        <div className="main">
            <div className="main-container">
                <div className="main-top">
                    {/* <h2 className="main-question">{questionData.title} </h2> */}
                    <NavLink to="/add-question">
                        <button>Ask Question</button>
                    </NavLink>
                    {/* <a href="/add-question">
            <button>Ask Question</button>
          </a> */}
                </div>
                <div className="main-desc">
                    <div className="info">
                        <p>
                            Asked
                            <span>{new Date(questionData.created_at).toLocaleString()}</span>
                        </p>
                        <p>
                            Active<span>today</span>
                        </p>
                        <p>
                            Viewed<span>43times</span>
                        </p>
                    </div>
                </div>
                <div className="all-questions" style={{ flexDirection: "column" }}>
                    <p style={{
                        marginBottom: "20px",
                        fontSize: "1.3rem",
                        fontWeight: "300",
                    }}>
                        {questionData.answerDetails.length}Answer(s)
                    </p>
                    {
                        questionData.answerDetails.map((_q) => (
                            <div key={_q._id}
                                className="all-questions-container">
                                <div className="all-questions-left">
                                    <div className="all-options">
                                        <p className="arrow">▲</p>
                                        <p className="arrow">0</p>
                                        <p className="arrow">▼</p>
                                        <BookmarkIcon />
                                        <HistoryIcon />
                                    </div>
                                </div>
                                <div className="question-answer">
                                    <p>{ReactHtmlParser(_q.answer)}</p>
                                    <div className="author">
                                        <small>
                                            asked {new Date(_q.created_at).toLocaleString()}
                                        </small>
                                        <div className="auth-details">
                                            <Avatar src={_q.user.photo} />
                                            <p>
                                                {_q.user.displayName
                                                    ? _q.user.displayName
                                                    : "Audi tulasi"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>))}

                    <div className="comments">
                        <div className="comment">
                            {questionData.comments &&
                                questionData.comments.map((_qd) => (
                                    <p key={_qd._id}>
                                        {_qd.comment}{" "}
                                        <span>
                                            - {_qd.user ? _qd.user.displayName : "lakshmi tulasi"}
                                        </span>{" "}
                                        {"    "}
                                        <small>
                                            {new Date(_qd.created_at).toLocaleString()}
                                        </small>
                                    </p>
                                ))}
                        </div>
                        <p onClick={() => setShow(!show)}>Add a comment</p>
                        {show && (
                            <div className="title">
                                <textarea
                                    style={{
                                        margin: "5px 0px",
                                        padding: "10px",
                                        border: "1px solid rgba(0, 0, 0, 0.2)",
                                        borderRadius: "3px",
                                        outline: "none",
                                    }}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    type="text"
                                    placeholder="Add your comment..."
                                    rows={5}
                                />
                                <button
                                    onClick={handleComment}
                                    style={{
                                        maxWidth: "fit-content",
                                    }}
                                >
                                    Add comment
                                </button>
                            </div>
                        )}
                    </div>
                </div>


                <div
                    style={{
                        flexDirection: "column",
                    }}
                    className="all-questions"

                >
                    <p
                        style={{
                            marginBottom: "20px",
                            fontSize: "1.3rem",
                            fontWeight: "300",
                        }}
                    >
                        {questionData && questionData.answerDetails.length} Answers
                    </p>
                    {questionData.answerDetails.map((_q) => (
                        <>
                            <div
                                style={{
                                    borderBottom: "1px solid #eee",
                                }}
                                key={_q._id}
                                className="all-questions-container"
                            >
                                <div className="all-questions-left">
                                    <div className="all-options">
                                        <p className="arrow">▲</p>

                                        <p className="arrow">0</p>

                                        <p className="arrow">▼</p>

                                        <BookmarkIcon />

                                        <HistoryIcon />
                                    </div>
                                </div>
                                <div className="question-answer">
                                    {ReactHtmlParser(_q.answer)}
                                    <div className="author">
                                        <small>
                                            asked {new Date(_q.created_at).toLocaleString()}
                                        </small>
                                        <div className="auth-details">
                                            <Avatar {...stringAvatar(_q.user.displayName)} />
                                            <p>
                                                {_q.user.displayName
                                                    ? _q.user.displayName
                                                    : "audi tulasi"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>

            </div>
            <div className="main-answer">
                <h3
                    style={{
                        fontSize: "22px",
                        margin: "10px 0",
                        fontWeight: "400",
                    }}
                >
                    Your Answer
                </h3>
                <ReactQuill
                    value={answer}
                    onChange={handleQuill}
                    theme="snow"
                    style={{
                        height: "200px",
                    }}
                />
            </div>
            <button
                onClick={handleSubmit}
                style={{
                    marginTop: "100px",
                    maxWidth: "fit-content",
                }}
                type='submit'
            >
                Post your answer
            </button>
        </div >
    )
}

export default MainQuestion
