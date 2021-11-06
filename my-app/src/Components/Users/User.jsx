import React from "react";
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from "react-router-dom";

let User = ({ user, followingInProgress, unfollow, follow, ...props}) => {
    return (<div>
        <div className={styles.card}>
            <img src="https://mir-oboev.ua/image/cache/catalog/oboi/36899-3-1000x1000.jpg"
                className={styles.card_img} />
            <img alt='User' src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}
                className={styles.profile_img} />
            <NavLink to={`/profile/${user.id}`}>
                <h1 className={styles.userName}>{user.name}</h1>
            </NavLink>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                        className={styles.btn_unfollow}
                        onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                        className={styles.btn_follow}
                        onClick={() => {
                            follow(user.id)
                        }}>Follow</button>}
            </div>
        </div>
    </div>)
}

export default User;