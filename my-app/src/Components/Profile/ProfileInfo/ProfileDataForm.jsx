import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../command/FormsControls/FormsControls';
import styles from '../../command/FormsControls/FormsControls.module.css';
import './newStyle.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (
        <form style={{ 'margin-left': '40px', 'float': 'left', 'width': '50%' }} onSubmit={handleSubmit}>
            {error && <div className={styles.FormSomeError}>
                {error}
            </div>}
            <div>
                <pre><h1 >  {createField("Full name", "fullName", [], Input)}</h1></pre>
            </div>
            <div>
                <div>
                    <b>Looking for a job: </b> {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
                </div>
                <div>
                    <b>My professional skills: </b> {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
                </div>
                <div>
                    <b>About me: </b>
                    <div>
                        {createField("About me", "aboutMe", [], Textarea)}
                    </div>
                </div>
            </div>
            <div>
                <b><span style={{ "font-size": "1rem" }}>My contacts:</span></b>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}: </b> {createField(key, "contacts." + key, [], Textarea)}
                    </div>
                })}
            </div>
            <button class='chatButton'>
                Save
            </button>
        </form >
    )
}

const ProfileDataReduxForm = reduxForm({ form: 'profile' })(ProfileDataForm);
export default ProfileDataReduxForm;