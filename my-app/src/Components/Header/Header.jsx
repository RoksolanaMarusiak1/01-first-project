import React from 'react';
import s from '../Header/Header.module.css';
import { NavLink } from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import exitIcon from '@iconify/icons-icomoon-free/exit';
import chevronDownCircle from '@iconify/icons-ion/chevron-down-circle';
const Header = (props) => {
    return (

        <header className={s.header}>
            <img alt='social-network' src={"./logo.png"} />

            <div className={s.loginBlock}>
                {props.isAuth ? <div>
                    <ul>
                        <li>{props.login} <Icon icon={chevronDownCircle} />
                            <ul>
                                <li><button className={s.logout_btn} onClick={props.logout}>Log out <Icon icon={exitIcon} /></button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
};

export default Header;
