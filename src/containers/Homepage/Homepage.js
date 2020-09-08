import React, { useState, useEffect } from 'react';
import ImgViewer from './ImgViewer';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary';
import Modal from '../../components/Modal/Modal';
import SideContent from '../../components/SideContent/SideContent';
import ModalImageViewer from './ModalImageViewer/ModalImageViewer';

var pagination = 0;
const totalImagesToRenderAtOnce = 10;

const homepage = React.memo(props => {

    const [imageClicked, setImageClicked] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [presentIndex, setPresentIndex] = useState(0);
    const [size, setSize] = useState(0);
    const [showContent, setShowContent] = useState(true);
    const [showContentSide, setShowContentSide] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [updatedImages, setUpdatedImages] = useState([]);

    useEffect(() => {
        if (props.location.aboutProps) {
            props.initImages(props.location.aboutProps);
            pagination = 0;
        } else {
            props.history.push('/');
        }
    }, [props.location.aboutProps]);

    useEffect(() => {
        fetchItems();
    }, [pagination, isFetching, props.images]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const fetchItems = () => {
        if (pagination === 0 && !isFetching && props.images) {
            //Gonna render for first time
            let processImages = [];
            setIsFetching(false);
            props.images.map((image, index) => {
                if (index < totalImagesToRenderAtOnce) {
                    processImages.push(image);
                }
            })
            setUpdatedImages(processImages);
        } else if (props.images && pagination > 0 && isFetching) {
            setIsFetching(false);
            let processImages = [];
            var counter = 0;
            props.images.map((image, index) => {
                if (index >= totalImagesToRenderAtOnce * pagination && counter < totalImagesToRenderAtOnce) {
                    processImages.push(image);
                    counter = counter + 1;
                }
            })
            setUpdatedImages([...updatedImages, ...processImages]);
        }
    }

    const handleScroll = () => {
        if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) > 10) return;
        console.log('Fetching more items');
        pagination = pagination + 1;
        setIsFetching(true);
    }

    const imageClickedHandler = (image) => {
        let size = 0;
        for (let key in image.urlArr) {
            //console.log(image.urlArr[key]);
            if (image.urlArr[key] !== '') {
                size = size + 1;
            }
        }
        setShowModal(true);
        setImageClicked(image);
        setPresentIndex(0);
        setSize(size);
    }

    const toCloseModalHandler = () => setShowModal(false);

    const drawerToggleClicked = () => setShowContent(!showContent);

    let content = <Spinner />
    if (props.images && updatedImages.length > 0) {
        if (updatedImages.length === 0) {
            content = <h1 style={{ margin: 'auto' }}>No Data Available! <Link to='/'>Click Here</Link> to go back</h1>;
        } else {
            content = updatedImages.map(image => {

                return <ImgViewer key={image.id}
                    url={image.urlArr[Object.keys(image.urlArr)[0]]}
                    title={image.title}
                    price={image.price}
                    clicked={() => imageClickedHandler(image)} />
            })
        }
    }else if(props.images && props.imagesSet) {
        content = <h1 style={{ margin: 'auto' }}>No Data Available! <Link to='/'>Click Here</Link> to go back</h1>;
    }

    const imageContent =
        <Auxillary>
            <Modal show={showModal} modalClosed={toCloseModalHandler} isSideContent>
                <ModalImageViewer
                    clicked={toCloseModalHandler}
                    imageClicked={imageClicked}
                    size={size}
                    toggleSideContent={drawerToggleClicked}
                    showContentSide={showContentSide} />
            </Modal>
            {showModal ?
                <SideContent
                    image={imageClicked}
                    isLiked={props.isLiked}
                    username={props.username}
                    showContentSide={showContentSide} /> : null}
        </Auxillary>

    return (
        <div className='row' style={{
            marginTop: '100px',
            marginLeft: window.innerWidth < 500 ? '5%' : '6.5%',
        }}>
            {content}
            {imageContent}
        </div>
    );
})

const mapPropsToState = state => {
    return {
        images: state.images.images,
        username: state.users.username,
        imagesSet: state.images.imagesSet
    }
}

const dispatchPropsToState = dispatch => {
    return {
        initImages: categoryValue => dispatch(actions.fetchImages(categoryValue))
    }
}

export default withRouter(connect(mapPropsToState, dispatchPropsToState)(homepage));