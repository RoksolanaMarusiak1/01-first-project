import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {

    return (
        <div className={s.dialog + ' ' + s.active}>
            <li className={s.clearfix}>
                <img className={s.avatar} src={props.photo} alt="avatar" />
                <div className={s.about}>
                    <div className={s.name}><NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink></div>
                    <div className={s.status}>
                        <i className={props.online?'fa fa-circle online' : 'fa fa-circle offline'}></i> {props.lastSeen}
                    </div>
                </div>
            </li>
        </div>
    )
}

export default DialogItem;