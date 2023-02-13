import React from 'react'
import { NavLink } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import Allquestions from '../Allquestions/Allquestions';
import './main.css'
const Main = ({ questions }) => {
    // console.log(questions)
    return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    <h2>Top-Question</h2>
                    <NavLink to='/add-question' >
                        <button>
                            Ask Question
                        </button>
                    </NavLink>
                </div>
                <div className='main-dec'>
                    <p>{questions.length} questions</p>

                    <div className='main-filter'>
                        <div className='main-tabs'>
                            <div className='main-tab'>
                                <NavLink to='/'>Interesting</NavLink>
                            </div>
                            <div className='main-tab'>
                                <NavLink to='/'>Bountied</NavLink>
                            </div>
                            <div className='main-tab'>
                                <NavLink to='/'>Hot</NavLink>
                            </div>
                            <div className='main-tab'>
                                <NavLink to='/'>week</NavLink>
                            </div>
                            <div className='main-tab'>
                                <NavLink to='/'>month</NavLink>
                            </div>
                        </div>
                        <div className='main-filter-item'>
                            <FilterListIcon />
                            <p>filter</p>
                        </div>
                    </div>
                    <hr />
                    {questions.map((_q, index) => (
                        <div key={index} className="question">
                            <Allquestions question={_q} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Main

