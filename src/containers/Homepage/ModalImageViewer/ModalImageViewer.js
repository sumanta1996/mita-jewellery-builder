import React, { Component } from 'react';
import classes from './ModalImageViewer.css';
import leftArrow from '../../../assets/leftArrow.png';
import rightArrow from '../../../assets/rightArrow.png';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

class ModalImageViewer extends Component {
    state = {
        presentIndex: 0,
        isZoomed: false
    }

    nextClicked = () => {
        this.setState({ presentIndex: this.state.presentIndex + 1 });
    }

    prevClicked = () => {
        this.setState({ presentIndex: this.state.presentIndex - 1 });
    }

    zoomIn() {
        this.setState({ isZoomed: true });
    }

    zoomOut() {
        this.setState({ isZoomed: false });
    }

    render() {
        return (
            <div className={classes.ModalImageViewer}>
                <div className={classes.Buttons} >
                    <button type="button" className="btn btn-light" disabled={this.state.presentIndex === 0} onClick={this.prevClicked}>
                        <img style={{ width: '30px', height: '30px' }} alt='Previous' src={leftArrow} />
                    </button>
                    <button type="button" className="btn btn-light" disabled={this.state.presentIndex === (this.props.size - 1)} onClick={this.nextClicked}>
                        <img style={{ width: '30px', height: '30px' }} alt='Next' src={rightArrow} />
                    </button>
                    <div className={classes.cross} onClick={this.props.clicked}>
                        <h1>X</h1>
                    </div>
                </div>
                <img
                    src={this.props.imageClicked.urlArr[Object.keys(this.props.imageClicked.urlArr)[this.state.presentIndex]]}
                    className='card-img-top' style={{
                        width: this.state.isZoomed ? '100%' : '80%',
                        height: this.state.isZoomed ? '100%' : '80%',
                        maxHeight: '600px',
                        transition: this.state.isZoomed ? 'all 0.3s ease-out' : 'all 0.3s ease-in',
                        cursor: this.state.isZoomed ? 'zoom-out' : 'zoom-in',
                        objectFit: 'cover'
                    }}
                    alt='' onClick={() => this.state.isZoomed ? this.zoomOut() : this.zoomIn()} />
            </div>
        )
    }
}

export default withErrorHandler(ModalImageViewer, axios);