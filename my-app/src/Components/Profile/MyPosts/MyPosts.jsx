import React from 'react';
import s from './MyPosts.module.css';
import Post from './Posts/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLenghtCreator } from '../../../utils/validators/validator';
import { Textarea } from '../../command/FormsControls/FormsControls';

const maxLengt10 = maxLenghtCreator(10);

const MyPosts = React.memo(props => {
    let postsElements = props.posts.map(posts => <Post key={posts.id} img={posts.img} title={posts.title} message={posts.message} likesCount={posts.likesCount} />)

    let addNewPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div>
            <div className={s.postsBlock}>
            </div>
            <NewPostForm onSubmit={addNewPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )

});

let NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.form}>
                <div className={s.postInput}>
                    <Field placeholder="Input message" name="newPostText" component={Textarea}
                        validate={[required, maxLengt10]} />
                    <button className={s.postButton}>
                        Add Post
                    </button>
                </div>
            </div>
        </form>
    )
};

NewPostForm = reduxForm({ form: "AddNewPost" })(NewPostForm);

export default MyPosts;