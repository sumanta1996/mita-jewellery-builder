import React, { Component, useState, useContext } from 'react';
import classes from './ModalImageViewer.css';
import leftArrow from '../../../assets/leftArrow.png';
import rightArrow from '../../../assets/rightArrow.png';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import DrawerToggleSideContent from '../../../components/DrawerToggle/DrawerToggleSideContent/DrawerToggleSideContent';

const modalImageViewer = props => {
    const [presentIndex, setPresentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const nextClicked = () => {
        setPresentIndex(presentIndex + 1);
    }

    const prevClicked = () => {
        setPresentIndex(presentIndex - 1);
    }

    const zoomIn = () => {
        setIsZoomed(true);
    }

    const zoomOut = () => {
        setIsZoomed(false);
    }

    return (
        <div className={classes.ModalImageViewer}>
            <div className={classes.Buttons} >
                <button type="button" className="btn btn-light" disabled={presentIndex === 0} onClick={prevClicked}>
                    <img style={{ width: '30px', height: '30px' }} alt='Previous' src={leftArrow} />
                </button>
                <button type="button" className="btn btn-light" disabled={presentIndex === (props.size - 1)} onClick={nextClicked}>
                    <img style={{ width: '30px', height: '30px' }} alt='Next' src={rightArrow} />
                </button>
                <div className={classes.cross} onClick={props.clicked}>
                    <h1>X</h1>
                </div>
                <DrawerToggleSideContent />
            </div>
            <img
                src={props.imageClicked.urlArr[Object.keys(props.imageClicked.urlArr)[presentIndex]]}
                className='card-img-top' style={{
                    width: isZoomed ? '100%' : '80%',
                    height: isZoomed ? '100%' : '80%',
                    maxHeight: '600px',
                    transition: isZoomed ? 'all 0.3s ease-out' : 'all 0.3s ease-in',
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                    objectFit: 'cover'
                }}
                alt='' onClick={() => isZoomed ? zoomOut() : zoomIn()} />
        </div>
    )
}

export default withErrorHandler(modalImageViewer, axios);