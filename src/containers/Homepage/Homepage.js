import React, { Component } from 'react';
import ImgViewer from './ImgViewer';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary';
import Modal from '../../components/Modal/Modal';
import SideContent from '../../components/SideContent/SideContent';
import ModalImageViewer from './ModalImageViewer/ModalImageViewer';

class Homepage extends Component {

    state = {
        imageClicked: null,
        showModal: false,
        presentIndex: 0,
        size: 0,
        showContent: true,
        isZoomed: false
    }

    componentDidMount() {
        if (this.props.location.aboutProps) {
            this.props.initImages(this.props.location.aboutProps);
        } else {
            this.props.history.push('/');
        }
    }

    imageClickedHandler = (image) => {
        let size = 0;
        for (let key in image.urlArr) {
            //console.log(image.urlArr[key]);
            if (image.urlArr[key] !== '') {
                size = size + 1;
            }
        }
        this.setState({ showModal: true, imageClicked: image, presentIndex: 0, size: size });
    }

    toCloseModalHandler = () => {
        this.setState({ showModal: false });
    }

    nextClicked = () => {
        this.setState({ presentIndex: this.state.presentIndex + 1 });
    }

    prevClicked = () => {
        this.setState({ presentIndex: this.state.presentIndex - 1 });
    }

    drawerToggleClicked = () => {
        this.setState({ showContent: !this.state.showContent });
    }

    zoomIn() {
        this.setState({ isZoomed: true });
    }

    zoomOut() {
        this.setState({ isZoomed: false });
    }

    render() {
        let content = <Spinner />
        if (this.props.images) {
            let updatedImages = [];
            for (let image in this.props.images) {
                updatedImages.push(this.props.images[image]);
            }
            if (updatedImages.length === 0) {
                content = <h1 style={{ margin: 'auto' }}>No Data Available! <Link to='/'>Click Here</Link> to go back</h1>;
            } else {
                content = updatedImages.map(image => {
                    return <ImgViewer key={image.id}
                        url={image.urlArr[Object.keys(image.urlArr)[0]]}
                        title={image.title}
                        clicked={() => this.imageClickedHandler(image)} />
                })
            }
        }

        const imageContent =
            <Auxillary>
                <Modal show={this.state.showModal} modalClosed={this.toCloseModalHandler} isSideContent>
                    <ModalImageViewer clicked={this.toCloseModalHandler} imageClicked={this.state.imageClicked} size={this.state.size} />
                </Modal>
                {(this.state.showModal) ?
                    <SideContent clicked={this.clickedNext} image={this.state.imageClicked} isLiked={this.props.isLiked} username={this.props.username} /> : null}
            </Auxillary>

        return (
            <div className='row'>
                {content}
                {imageContent}
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        images: state.images.images,
        username: state.users.username
    }
}

const dispatchPropsToState = dispatch => {
    return {
        initImages: categoryValue => dispatch(actions.fetchImages(categoryValue))
    }
}

export default withRouter(connect(mapPropsToState, dispatchPropsToState)(Homepage));