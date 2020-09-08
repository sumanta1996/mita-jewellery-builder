import React from 'react';
import classes from './CommentBox.css';

const commentBox = props => {
    return (
        <div>
            {props.commentArr.map(comments => {
                console.log(comments.comment);
                if (comments.comment.includes('$separator')) {
                    const allComments = comments.comment.split('$separator');
                    return allComments.map((comment, index) => <div key={index} className={classes.CommentBox}>
                        <h5>{comments.name}</h5>
                        <h6>{comment}</h6>
                    </div>)
                } else {
                    return <div key={comments.name + comments.comment} className={classes.CommentBox}>
                        <h5>{comments.name}</h5>
                        <h6>{comments.comment}</h6>
                    </div>
                }
            }
            )}
            <br />
            <br />
        </div>
    )
}

export default commentBox;