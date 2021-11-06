import { ProfileAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, title: 'As winter looms, reports of starvation in North Korea', message: "The warnings are stark and coming from inside and outside of North Korea. Defectors based in South Korea have told us that their families in the North are going hungry. There is a concern as winter approaches that the most vulnerable will starve.", 
        likesCount: 12, img: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/A69F/production/_121355624_gettyimages-668755738.jpg'},
        { id: 2, title:'How pop star Zara Larsson made a seven-figure sum on Roblox', message: "Pop star Zara Larsson says she's made a seven-figure sum by selling merchandise on the video game platform Roblox.", 
        likesCount: 11, img: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/17306/production/_121428949_zara-larsson-2021-press-cr-jordan-rossi-billboard-1548-1614271599-compressed.jpg' }
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_STATUS: {
            return { ...state, status: action.status };
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        }
        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: {...state.profile, photos: action.photos} }
        }
        default:
            return state;
    }
};

export const addPost = (newPostText) => {
    return { type: ADD_POST, newPostText }
};

export const deletePost = (postId) => {
    return { type: DELETE_POST, postId }
};

export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile }
};

export const setStatus = (status) => {
    return { type: SET_STATUS, status }
};

export const savePhotoSuccess = (photos) => {
    return { type: SAVE_PHOTO_SUCCESS, photos }
};

export const getUserProfile = (profile) => async (dispatch) => {
    let response = await ProfileAPI.getProfile(profile);
    dispatch(setUserProfile(response.data));

};

export const getStatus = (status) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(status);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await ProfileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const savePhoto = (photos) => async (dispatch) => {
    let response = await ProfileAPI.updatePhoto(photos);
    if (response.data.resultCode === 0) {
        dispatch(savePhoto(response.data.data.photos));
    }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await ProfileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('profile', { _error: response.data.messages[0] }));
    }
};

export default profileReducer;