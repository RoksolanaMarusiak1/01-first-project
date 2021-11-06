import React, { useState } from 'react';
import './newStyle.css'
import Loader from '../../command/Preloader/Loader';
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import Tab from '../../command/Tab/Tab';
import MyPostsContainer from '../MyPosts/MyPostsContainer';

const ProfileInfo = (props) => {
    if (props.profile === null) {
        return <Loader />
    }

    const onMainPhotoChange = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div>
                <ProfileData {...props} isOwner={props.isOwner}
                    onMainPhotoChange={onMainPhotoChange} />
            </div>
        </div>
    )
};

const ProfileData = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (props.profile === null) {
        return <Loader />
    }


    const onSubmit = (formData) => {
        props.saveProfile(formData);
        setEditMode(false);
    }
    const tabContent = [
        {
            title: 'Posts',
            content: [<MyPostsContainer />]
        },
        {
            title: 'Settings',
            content: [<ProfileDataForm onSubmit={onSubmit} {...props} initialValues={props.profile} />]
        }
    ]
    return (
        <div>
            <div className='container'>
                <div className='profileHeader'>
                    <div className='profileImg'>
                        <img src={props.profile.photos.large != null
                            ?
                            props.profile.photos.large
                            :
                            userPhoto} alt='User avatar ' />
                        {props.isOwner &&
                            <div>
                                <input type="file" name='file' id='file' onChange={props.onMainPhotoChange} class='uploadPhoto' />
                                <label for="file" class='loadLabel'>
                                    <img src='data:image/png;base64,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'></img>
                                </label>
                            </div>
                        }
                    </div>
                    <div class='profileNavInfo'>
                        <h3 class='userName'>
                            {props.profile.fullName}
                        </h3>
                        <div class='address'>
                            <p class="state">
                                <ProfileStatusWithHooks isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus} />
                            </p>
                        </div>
                    </div>
                    {props.isOwner &&
                        <div class='profileOption'>
                            <div class='notification'>
                                <i class='fa fa-bell'></i>
                                <span class='alertMessages'>1</span>
                            </div>
                        </div>
                    }
                </div>
                <div class='mainBd'>
                    <div class='leftSide'>
                        <div class='profileSide'>
                            <p class='mobileNo'>
                                <i class='fa fa-briefcase'></i>{props.profile.lookingForAJob ?
                                    "I am looking for a job" : "I am not looking for a job"}
                            </p>
                            <p class='userEmail'>
                                {props.profile.lookingForAJob ?
                                    <div>
                                        <i class='fa fa-cogs'></i>{props.profile.lookingForAJobDescription}
                                    </div>
                                    : ""
                                }
                            </p>
                            <div class='userBio'>
                                <h3>My contacts</h3>
                                <p class='bio'>
                                    <a href={props.profile.contacts.vk}><img alt='vk.com' src="https://img.icons8.com/color/48/000000/vk-circled.png" /></a>
                                    <a href={props.profile.contacts.twitter}><img alt='twitter.com' src="https://img.icons8.com/color/48/000000/twitter.png" /></a>
                                    <a href={props.profile.contacts.instagram}><img alt='instagram.com' src="https://img.icons8.com/color/48/000000/instagram-new.png" /></a>
                                    <a href={props.profile.contacts.youtube}><img alt='youtube.com' src="https://img.icons8.com/color/48/000000/youtube-play.png" /></a>
                                    <a href={props.profile.contacts.github}><img alt="github.com" src="https://img.icons8.com/color/48/000000/github--v1.png" /></a>
                                    <a href={props.profile.contacts.mainLink}><img alt='mainlink.com' src="https://img.icons8.com/color/48/000000/medium-monogram.png" /></a>
                                </p>
                            </div>
                            <div class='profileBtn'>
                                {props.profile.contacts.website ? <button class="websiteButton"><a href={props.profile.contacts.website}></a><i class='fa fa-globe'></i> My website</button> : ""}
                                <button class='chatButton'>
                                    <i class='fa fa-comment'></i> Chat
                                </button>
                                {!props.isOwner &&
                                    < button class='createButton'>
                                        <i class='fa fa-plus'></i> Follow
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div class='rigthSide'>
                        {props.isOwner ?
                            <Tab active={0}>
                                {tabContent.map((tab, idx) => (
                                    <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                                        {tab.content}
                                    </Tab.TabPane>
                                ))}
                            </Tab> :
                            <MyPostsContainer />
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileInfo;