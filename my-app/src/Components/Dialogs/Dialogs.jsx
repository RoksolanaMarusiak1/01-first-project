import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import ChatHeader from './ChatHeader/ChatHeader';
import { reduxForm, Field } from 'redux-form';
import { Textarea } from '../command/FormsControls/FormsControls';
import '../../assets/font-awesome/css/font-awesome.css';
import '../command/fontAwesome.css';

const MessageForm = (props) => {
    return (<div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Input your message..."} name={"newMessageText"} component={Textarea}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    </div>
    )
};

const MessageReduxForm = reduxForm(
    { form: 'messageForm' }
)(MessageForm);

const Dialogs = (props) => {
    let dialogsElements = props.messagesPage.dialogsData.map(dialog => <DialogItem id={dialog.id} key={dialog.id} name={dialog.name} photo={dialog.photo}
        online={dialog.online} lastSeen={dialog.lastSeen} />);

    let messagesElements = props.messagesPage.messagesData.map(messages => <MessageItem id={messages.id} key={messages.id}
        message={messages.message}  departureDate={messages.departureDate} isOwner={props.isOwner} senderId={messages.senderId}
        
        userData = {
            props.messagesPage.dialogsData.filter(dialog => dialog.id === messages.senderId)
        }
        />);
        
    let AboutDialog = props.messagesPage.dialogsData.filter(dialog => dialog.id == props.getIdFromPath(props.location.pathname))
    .map(dialog => <ChatHeader key={dialog.id} name={dialog.name} messagesCount={dialog.messagesCount} photo={dialog.photo}/>);

    let sendMessage = (value) => {
        props.sendMessage(value.newMessageText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.container + " " + s.clearfix}>
                <div className={s.people_list} id="people_list">
                    <div className={s.search}>
                        <input type="text" placeholder="search" />
                    </div>
                    <ul className={s.list}>
                        {dialogsElements}
                    </ul>
                </div>
                <div className={s.chat}>
                {AboutDialog}
                    <div className={s.chat_history}>
                        <ul>
                            {messagesElements}
                        </ul>
                    </div>
                    <div className={s.chat_message + " " + s.clearfix}>
                        <MessageReduxForm onSubmit={sendMessage} />
                        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                         <i className="fa fa-file-image-o"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
