import React from "react";
import styles from './Users.module.css';
import Paginator from "../command/Paginator/Paginator";
import User from "./User";

let Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, ...props }) => {
    return (
        <div>
            <div>
                <h1 className={styles.heading}>Find Users</h1>
            </div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                    currentPage={currentPage} onPageChanged={onPageChanged} />
            <div className={styles.card_wrapper}>
                {
                    props.users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow} follow={props.follow}
                    />)
                }
            </div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage} onPageChanged={onPageChanged} />
            <br/>
        </div>)
}

export default Users;