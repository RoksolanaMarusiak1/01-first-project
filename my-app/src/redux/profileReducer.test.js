import profileReducer, {addPost, deletePost} from './profileReducer';
import React from 'react';

let state = {
    posts: [
        { id: 1, message: "", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 }
    ]
}

it('length of posts should be incremented', () => {
    //1. test data
    let action = addPost('hello1');
    
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect (newState.posts.length).toBe(3);
});

it('mesage of new post should be correct', () => {
    //1. test data
    let action = addPost('hello1');
    
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect (newState.posts[2].message).toBe('hello1');
});

it('after deleting legth of posts should be decrement', () => {
    //1. test data
    let action = deletePost(1);
    
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect (newState.posts.length).toBe(1);
});
