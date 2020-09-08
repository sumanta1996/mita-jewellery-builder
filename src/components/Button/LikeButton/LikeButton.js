import React, { Component } from 'react';
import classes from './LikeButton.css';
import comment from '../../../assets/comment.png';
import { connect } from 'react-redux';
import LikedPeople from '../../LikedPeople/LikedPeople';

class LikeButton extends Component {
    state = {
        showLikedPeople: false
    }

    showLikedPeopleHandler = () => {
        this.setState({ showLikedPeople: true })
    }

    closeLikedPeopleHandler = () => {
        this.setState({ showLikedPeople: false })
    }

    render() {
        let cssClasses = [classes.HeartAnimation];
        if (this.props.toggle) {
            cssClasses.push(classes.Animate)
        }

        return (
            <div className={classes.LikeButton}>
                <p onClick={this.showLikedPeopleHandler}>View Likes</p>
                <LikedPeople open={this.state.showLikedPeople} closed={this.closeLikedPeopleHandler} >
                    <h6 style={{color: '#1aa3ff'}}>All</h6>
                    <hr/>
                    {this.props.likedPeople ? this.props.likedPeople.map(person => <h6 key={person}>{person}</h6>) : ''}
                </LikedPeople>
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

const mapPropsToState = state => {
    return {
        likedPeople: state.users.likedPeople
    }
}

export default connect(mapPropsToState)(LikeButton);