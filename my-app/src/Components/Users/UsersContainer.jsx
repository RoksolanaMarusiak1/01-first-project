import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import Loader from '../command/Preloader/Loader';
import { getUserProfile} from '../../redux/profileReducer';

import {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowingProgress,
    getUsersThunkCreator
} from './../../redux/usersReducer';

import {
    getUsers,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
    getLookingForAJob
} from '../../redux/usersSelectors'

import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    };

    render() {
        
        return <>
            {this.props.isFetching ? <Loader /> : ""}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleIsFetching={this.props.toggleIsFetching}
                followingInProgress={this.props.followingInProgress}/>
        </>
    };
};

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose
    (connect(mapStateToProps, {
        follow, unfollow, setCurrentPage,
        toggleIsFollowingProgress, getUsersThunkCreator
    }))
    (UsersContainer);