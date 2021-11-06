import { UsersAPI } from '../api/api.js';
import { updateObjectArray } from '../utils/object-helpers.js';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 15,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, 'id', { followed: true })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, 'id', { followed: false })
      }
    case SET_USERS:
      return { ...state, users: action.users }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }
    case SET_TOTAL_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching ?
          [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
};

export const followSuccess = (userId) => {
  return { type: FOLLOW, userId: userId }
};

export const unfollowSuccess = (userId) => {
  return { type: UNFOLLOW, userId: userId }
};

export const setUsers = (users) => {
  return { type: SET_USERS, users }
};

export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage }
};

export const setUsersTotalCount = (totalUsersCount) => {
  return { type: SET_TOTAL_COUNT, totalUsersCount }
};

export const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching }
};

export const toggleIsFollowingProgress = (isFetching, userId) => {
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }
};

export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let data = await UsersAPI.getUsers(currentPage, pageSize);
  dispatch(setUsers(data.items));
  dispatch(setUsersTotalCount(data.totalCount));
  dispatch(toggleIsFetching(false));
};

export const FollowUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowingProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgress(false, userId));
};

export const follow = (userId) => async (dispatch) => {
  FollowUnfollowFlow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), followSuccess);
};

export const unfollow = (userId) => async (dispatch) => {
  FollowUnfollowFlow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI), unfollowSuccess);
};

export default usersReducer;