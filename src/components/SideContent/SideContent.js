import React, { Component } from 'react';
import classes from './SideContent.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import SpinnerComment from '../Spinner/SpinnerComment/SpinnerComment';
import CommentBox from './CommentBox/CommentBox';
import LikeButton from '../Button/LikeButton/LikeButton';
import { SideToggleContext } from '../../context/sideToggleContext';
import DrawerToggleSideContent from '../DrawerToggle/DrawerToggleSideContent/DrawerToggleSideContent';
import Button from '../Button/Button';

class sideContent extends Component {
    state = {
        showContent: false,
        showModal: false,
        comment: '',
        username: '',
        continueClicked: false
    }

    static contextType = SideToggleContext;

    constructor(props) {
        super(props);
        this.props.fetchLikesComments(this.props.image.imageId);
    }

    componentDidMount() {
        if (localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
            this.setState({ username: localStorage.getItem('userData'), continueClicked: true });
        }
    }

    drawerToggleClicked = () => {
        this.setState({ showContent: !this.state.showContent });
    }

    likedHandler = () => {
        if (!this.state.continueClicked) {
            this.setState({ showModal: true });
        } else {
            if (this.props.like || this.state.username !== '') {
                this.sendLike(!this.props.like);
            } else {
                if (this.props.username !== '' && this.state.username === '') {
                    this.setState({ username: this.props.username });
                    this.sendLike(!this.props.like);
                } else {
                    this.sendLike(!this.props.like);
                    this.setState({ showModal: true });
                }
            }
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        if (inputIdentifier === 'comment' && this.state.username === '') {
            if (this.props.username === '') {
                this.setState({ showModal: true, [inputIdentifier]: event.target.value });
            } else {
                this.setState({ [inputIdentifier]: event.target.value });
            }
        } else {
            this.setState({ [inputIdentifier]: event.target.value });
        }
    }

    sendLike = like => {
        if (this.props.like !== like && this.state.continueClicked) {
            const data = {
                imageId: this.props.image.imageId,
                fullName: this.state.username === '' ? this.props.username : this.state.username,
                liked: like
            }
            this.props.sendLikes(data);
        }
    }

    sendComments = () => {
        const separator = '$separator';
        const username = this.state.username === '' ? this.props.username : this.state.username;
        let existingComment = null;
        this.props.commentArr.map(comments => {
            if (comments.name === username) {
                existingComment = comments.comment;
            }
            return null;
        });
        existingComment = existingComment ? existingComment + separator + this.state.comment : this.state.comment;
        const data = {
            imageId: this.props.image.imageId,
            fullName: username,
            comment: existingComment
        }
        this.props.sendComments(data);
        this.setState({ comment: '' });
    }

    continueHandler = () => {
        localStorage.setItem('userData', this.state.username);
        this.props.saveUsername(this.state.username);
        this.setState({ showModal: false, continueClicked: true });
        if (this.state.username !== '') {
            this.sendLike(true);
        }
        this.props.fetchLikesComments(this.props.image.imageId);
    }

    editClickHandler = () => {
        if(this.props.username !== '') {
            this.setState({showModal: true, continueClicked: true});    
        }else {
            this.setState({showModal: true});
        }
    }

    modalHandler = () => {
        if (this.state.username === '') {
            this.setState({ showModal: false, like: false })
        } else {
            this.setState({ showModal: false });
        }
    }

    render() {
        let content = (<div style={{ zIndex: '500' }}>
            <div className={classes.SideContent}>
                <DrawerToggleSideContent />
                <h3 style={{ color: 'chocolate', marginTop: 10 }}><strong>{this.props.image.title}</strong></h3>
                <hr />
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td><strong>Image Id:</strong></td>
                            <td><strong>{this.props.image.id}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Description:</strong></td>
                            <td><strong>{this.props.image.description}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Length:</strong></td>
                            <td><strong>{this.props.image.length} cm</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Width:</strong></td>
                            <td><strong>{this.props.image.width} cm</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Height:</strong></td>
                            <td><strong>{this.props.image.height} cm</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Price:</strong></td>
                            <td><strong>{this.props.image.price} /-</strong></td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <LikeButton toggle={this.props.like} likes={this.props.likes} clicked={this.likedHandler} />
                {this.state.showModal ?
                    <Modal show={this.state.showModal} darker modalClosed={this.modalHandler}>
                        <div className={classes.Center}>
                            <ul>
                                <input type='text' placeholder='Enter your name'
                                    value={this.state.username}
                                    onChange={event => this.inputChangedHandler(event, 'username')} />
                            </ul>
                            <ul>
                                <Button disabled={this.state.username === ''} clicked={this.continueHandler} btnType="Success">Continue</Button>
                            </ul>
                        </div>
                    </Modal> : null}
                <div className={classes.NameEditPosition} onClick={this.editClickHandler}>
                    <p>Welcome {this.state.username === '' ? this.props.username : this.state.username}</p>
                    {this.state.username === '' ? null : <span className={classes.Pencil}>&#9999;</span>}
                </div>
                <CommentBox commentArr={this.props.commentArr} />
                {this.props.err ? <h5 style={{ color: 'red' }}>{this.props.err.message}</h5> : null}
            </div>
            {this.props.started ? <SpinnerComment /> :
                <div className={classes.Comments}>
                    <input type='textarea' placeholder='Write a comment' value={this.state.comment} onChange={event => this.inputChangedHandler(event, 'comment')} />
                    <button disabled={this.props.username === '' && !this.state.continueClicked} onClick={this.sendComments}>Submit</button>
                </div>}
        </div>)
        return (
            <div className={classes.SideContentPosition}>
                {this.context.showSideContent ? content : null}
            </div>
        )
    }
}

const mapPropsToState = state => {
    return {
        err: state.users.error,
        started: state.users.started,
        likes: state.users.likes,
        commentArr: state.users.commentArr,
        like: state.users.isLiked
    }
}

const dispatchPropsToState = dispatch => {
    return {
        saveUsername: username => dispatch(actions.saveUsername(username)),
        sendLikes: data => dispatch(actions.userLikingCommentingProcess(data, false)),
        sendComments: data => dispatch(actions.userLikingCommentingProcess(data, true)),
        fetchLikesComments: imageId => dispatch(actions.fetchLikesComments(imageId))
    }
}

export default connect(mapPropsToState, dispatchPropsToState)(sideContent);