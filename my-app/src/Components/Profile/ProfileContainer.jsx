import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile, getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from './../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refleshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    };

    componentDidMount() {
        this.refleshProfile();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refleshProfile();
        }
    };

    render() {
        return (
            <Profile {...this.props} savePhoto={this.props.savePhoto} isOwner={(!this.props.match.params.userId)}
                profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}
                saveProfile={this.props.saveProfile} />
        )
    }
};

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId
});

export default compose
    (connect(mapStateToProps, { setUserProfile, getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
        withRouter
    )
    (ProfileContainer);