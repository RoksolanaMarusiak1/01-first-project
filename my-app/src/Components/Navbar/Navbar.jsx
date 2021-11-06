import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <div>
                        <NavLink to='/profile' activeClassName={classes.active}>Profile</NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to='/dialogs' activeClassName={classes.active}>Messages</NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to='/users' activeClassName={classes.active}>Search</NavLink>

                    </div>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;