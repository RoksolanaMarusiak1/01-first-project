import React, { useState } from "react";
import styles from './Paginator.module.css';
import cn from "classnames";
import chevronLeft from '@iconify/icons-ion/chevron-left';
import chevronRight from '@iconify/icons-ion/chevron-right';
import { Icon, InlineIcon } from '@iconify/react';

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.data_pagination}>
            {portionNumber > 1 &&
                <Icon className={styles.arrow} icon={chevronLeft}
                    onClick={() => { setPortionNumber(portionNumber - 1) }}
                />
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={cn({ [styles.selectedPage]: currentPage === p }, styles.pageNumber)}
                        key={p}
                        onClick={(e) => {
                            onPageChanged(p);
                        }}>{p} </span>
                })}
            {portionCount > portionNumber &&
                <Icon className={styles.arrow} icon={chevronRight}
                    onClick={() => { setPortionNumber(portionNumber + 1) }} />
            }
        </div>
    )
}

export default Paginator;