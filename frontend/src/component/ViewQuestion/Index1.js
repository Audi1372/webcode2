import React from 'react'
import Sidebar from '../index/sidebar/Sidebar'
import './index.css'
import MainQuestion from './MainQuestion'
const Index1 = () => {
    return (
        <div className='stack-index'>
            <div className='stack-index-content'>
                <Sidebar />
                <MainQuestion />
            </div>
        </div>
    )
}

export default Index1
