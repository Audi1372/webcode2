import React, { useEffect, useState } from "react";

import Sidebar from './sidebar/Sidebar'
import './index.css'
import Main from './main/Main'
import axios from "axios";

const Index = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function getQuestion() {
            await axios.get("/api/question").then((res) => {
                setQuestions(res.data.reverse());
                console.log(res.data);
            })
                .catch((err) => {
                    // console.log(err)
                })
        }
        getQuestion();
    }, []);
    return (
        <div className="stack-index">
            <div className="stack-index-content">
                <Sidebar />
                <Main questions={questions} />
            </div>
        </div>
    );
}

export default Index
