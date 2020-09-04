import React from 'react';
import classes from './CommentBox.css';

const commentBox = props => {
    return (
        <div>
            {props.commentArr.map(comments => 
                <div key={comments.name+comments.comment} className={classes.CommentBox}>
                    <h5><strong>{comments.name}</strong></h5>
                    <h6>{comments.comment}</h6>
                </div>
            )}
            <br />
            <br />
        </div>
    )
}

export default commentBox;