import React from 'react';
import { sendMessage} from './../../redux/dialogsReducer';
import Dialogs from './Dialogs'
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class DialogsContainer extends React.Component {

    getIdFromPath = (path) => {
        let id = path.split('/')[2];
        if (id === undefined) id = 1;
        return id;
    };

    isOwner = (id) => {
        if (id === 1) return true;
        return false;
    }

    render() {
        
        return <>
            <Dialogs messagesPage = {this.props.messagesPage}
            isAuth = {this.props.isAuth} getIdFromPath = {this.getIdFromPath}
            sendMessage = {this.props.sendMessage} isOwner = {this.isOwner}
            {...this.props}
            />
        </>
    };
};

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        isAuth: state.auth.isAuth
    }
}

export default compose (
    connect(mapStateToProps, {sendMessage}),
    withRouter,
    WithAuthRedirect)
    (DialogsContainer);