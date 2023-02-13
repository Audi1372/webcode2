import React from 'react'
import { Avatar } from "@material-ui/core";
import { NavLink } from 'react-router-dom'
import './allquestions.css'
import ReactHtmlParser from "react-html-parser";
// import { stringAvatar } from "../../../utils/Avatar";


const Allquestions = ({ question }) => {
    // console.log(question.tags[0])
    const truncate = (str, n) => {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    // const tag = []
    const tag = JSON.parse(question.tags[0]);
    return (
        <div className='all-questions'>
            <div className='all-questions-container'>
                <div className='all-questions-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                            <p>0</p>
                            <span>Votes</span>
                        </div>
                        <div className='all-option'>
                            <p>{question.answerDetails.length}</p>
                            <span>Answers</span>
                        </div>
                        <div className='all-option'>
                            <small>2 views</small>
                        </div>
                    </div>
                </div>
                <div className='question-answer'>
                    <NavLink to={`/question?q=${question._id}`}>{question.title}</NavLink>
                    <div style={{ width: '90%' }}>
                        <div>{ReactHtmlParser(truncate(question.body))}</div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        {tag.map((eachtag, index) => (<>
                            <div key={index} className='question_tags'
                                style={{
                                    margin: "10px 5px",
                                    padding: "5px 10px",
                                    backgroundColor: "#007cd446",
                                    borderRadius: "3px",
                                }}
                            >
                                <span> {eachtag}</span>
                            </div>
                        </>

                        ))}
                    </div>
                    <div className="author">
                        <small>{new Date(question.created_at).toLocaleString()}</small>
                        <div className="auth-details">
                            <Avatar src={question.user.photo} />
                            <p>
                                {question.user.displayName
                                    ? question.user.displayName
                                    : "Audi tulasi"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Allquestions
