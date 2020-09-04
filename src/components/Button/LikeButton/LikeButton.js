import React, { Component } from 'react';
import classes from './LikeButton.css';
import comment from '../../../assets/comment.png';

class LikeButton extends Component {
    render() {
        let cssClasses = [classes.HeartAnimation];
        if (this.props.toggle) {
            cssClasses.push(classes.Animate)
        }

        return (
            <div>
                <hr />
                <div className={classes.LikeComment}>
                    <div className={cssClasses.join(' ')} onClick={this.props.clicked}>{this.props.likes}</div>
                    <button type="button" className="btn btn-light" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                        <img style={{ width: '30px', height: '30px' }} alt='Comment' src={comment} />
                        Comment
                    </button>
                </div>
                <hr />
            </div>
        )
    }
}

export default LikeButton;