import React from 'react';
import styles from './Loader.module.css';

let Loader = (props) => {
    return (
        <div className={styles.loader}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default Loader;