import React from 'react';
import s from './../Dialogs.module.css';

const MessageItem = (props) => {
    let isOwner = props.isOwner(props.senderId);
    return (
        <li className={s.clearfix}>
    <div className={isOwner? s.message_data + " " +  s.align_right : s.message_data + " " + s.align_left}>
        { isOwner &&
            <span className={s.message_data_time}>{props.departureDate}&nbsp; &nbsp;</span>       
        }
            <span className={s.message_data_name}>{props.userData[0].name}</span> <i className={isOwner?"fa fa-circle me": "fa fa-circle online"}></i>
        { !isOwner &&
            <span className={s.message_data_time}>{props.departureDate}&nbsp; &nbsp;</span>       
        }   
        </div>
        <div className={isOwner? s.message + " " +  s.other_message + " " + s.float_right : s.message + " " + s.my_message + " " + s.float_left}>
             {props.message}
    </div>
    </li>
    )
}

export default MessageItem;