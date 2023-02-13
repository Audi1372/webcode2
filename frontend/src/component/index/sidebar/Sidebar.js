import React from 'react'
import PublicIcon from '@mui/icons-material/Public';
import StarsIcon from '@mui/icons-material/Stars';
import WorkIcon from '@mui/icons-material/Work';
import './sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-options'>
                    <div className='sidebar-option'>
                        <NavLink to='/'>HOME</NavLink>
                    </div>
                    <div className='sidebar-option'>
                        <NavLink to='/'>PUBLIC</NavLink>
                        <div className='link'>
                            <div className='link-tag'>
                                <PublicIcon />
                                <NavLink to='/'>Question</NavLink>
                            </div>
                            <div className='tags'>
                                <p>Tags</p>
                                <p>Users</p>
                            </div>
                        </div>
                    </div>
                    <div className='sidebar-option'>
                        <NavLink to='/'>COLLECTIVES</NavLink>
                        <div className='link'>
                            <div className='link-tag'>
                                <StarsIcon />
                                <NavLink to='/'>Explore Collectoives</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='sidebar-option'>
                        <NavLink to='/'>FIND A JOB</NavLink>
                        <div className='tags'>
                            <p>Jobs</p>
                            <p>Companies</p>
                        </div>
                    </div><div className='sidebar-option'>
                        <NavLink to='/'>TEAMS</NavLink>
                        <div className='link'>
                            <div className='link-tag'>
                                <WorkIcon />
                                <NavLink to='/'>Companies</NavLink>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>



    )
}

export default Sidebar
