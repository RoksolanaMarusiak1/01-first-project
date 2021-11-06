import React from 'react';
import s from './Post.module.css';
const Post = (props) => {
    return (
        <div>
            <div className={s.row}>
                <div className={s.column}>
                    <div className={s.card}>
                        <img src={props.img}/>
                        <div className ={s.card_content}>
                        <a href="#">
                        <i class ="fa fa-comments-o"></i>
                        <span>10</span>
                        </a>&nbsp; &nbsp;
                        <i class ="fa fa-heart-o"></i>
                        <span>{props.likesCount}</span>
                        <h2>{props.title}</h2>
                        <p>{props.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Post;