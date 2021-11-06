import React from 'react';
import s from './../Dialogs.module.css';

const MessageItem = (props) => {
    return (
        <div className={s.chat_header + " " + s.clearfix}>
            <img className={s.avatar_checked} src={props.photo} alt="avatar" />
            <div className={s.chat_about}>
                <div className={s.chat_with}>Chat with {props.name}</div>
                <div className={s.chat_num_messages}>{`already ${props.messagesCount} messages`}</div>
            </div>
            <i className={s.fa_star +" fa fa-star"}></i>
        </div>
    )
}

export default MessageItem;