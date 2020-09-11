import React, { Component } from 'react';
import classes from './LikeButton.css';
import comment from '../../../assets/comment.png';
import { connect } from 'react-redux';
import LikedPeople from '../../LikedPeople/LikedPeople';
import Buttons from '../../Cart/Buttons/Buttons';
import * as actions from '../../../store/actions/index';

class LikeButton extends Component {
    state = {
        showLikedPeople: false,
        addToCart: false
    }

    componentDidMount() {
        var flag = false;
        this.props.images.map(image => {
            if(image.imageId === this.props.image.imageId) {
                flag = true;
            }
        })
        flag ? this.setState({addToCart: true}): null;
    }

    showLikedPeopleHandler = () => {
        this.setState({ showLikedPeople: true })
    }

    closeLikedPeopleHandler = () => {
        this.setState({ showLikedPeople: false })
    }

    addToCartHandler = () => {
        this.props.addToCart(this.props.image);
        this.setState({addToCart: true});
    }

    render() {
        let cssClasses = [classes.HeartAnimation];
        if (this.props.toggle) {
            cssClasses.push(classes.Animate)
        }

        return (
            <div className={classes.LikeButton}>
                <LikedPeople open={this.state.showLikedPeople} closed={this.closeLikedPeopleHandler} >
                    <h6 style={{color: '#1aa3ff'}}>All</h6>
                    <hr/>
                    {this.props.likedPeople ? this.props.likedPeople.map(person => <h6 key={person}>{person}</h6>) : ''}
                </LikedPeople>
                <div className='row'>
                    <Buttons cart clicked={this.addToCartHandler} added={this.state.addToCart}>{this.state.addToCart ? 'Added' : 'Add To Cart'}</Buttons>
                    <Buttons>Buy Now</Buttons>
                </div>
                <hr />
                <div className={classes.LikeComment}>
                    <div className={cssClasses.join(' ')} onClick={this.props.clicked}>{this.props.likes}</div>
                    <button type="button" className="btn btn-light" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                        <img style={{ width: '30px', height: '30px' }} alt='Comment' src={comment} />
                        Comment
                    </button>
                </div>
                <hr />
                <p onClick={this.showLikedPeopleHandler}>View Likes</p> 
            </div>
        )
    }
}

const mapPropsToState = state => {
    return {
        likedPeople: state.users.likedPeople,
        images: state.cart.images
    }
}

const dispatchPropsToState = dispatch => {
    return {
        addToCart: image => dispatch(actions.addToCart(image))
    }
}

export default connect(mapPropsToState, dispatchPropsToState)(LikeButton);