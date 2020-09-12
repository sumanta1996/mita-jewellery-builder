import React, { useEffect, useState } from 'react';
import classes from './ModalImageViewer.css';
import leftArrow from '../../../assets/leftArrow.png';
import rightArrow from '../../../assets/rightArrow.png';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import DrawerToggleSideContent from '../../../components/DrawerToggle/DrawerToggleSideContent/DrawerToggleSideContent';

const modalImageViewer = props => {
    const [presentIndex, setPresentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [squareImage, setSquareImage] = useState(false);

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

    useEffect(() => {
        if(document.getElementById('img1')) {
            var width = document.getElementById('img1').naturalWidth;
            var height = document.getElementById('img1').naturalHeight;
            if(width > height) {
                setSquareImage(true);
            }else {
                setSquareImage(false);
            }
        }
    }, [presentIndex, squareImage]);

    return (
        <div className={classes.ModalImageViewer}>
            <div className={classes.PrevButton}>
                <button type="button" className="btn btn-light" disabled={presentIndex === 0} onClick={prevClicked}>
                    <img style={{ width: '30px', height: '30px' }} alt='Previous' src={leftArrow} />
                </button>
            </div>
            <div className={classes.NextButton}>
                <button type="button" className="btn btn-light" disabled={presentIndex === (props.size - 1)} onClick={nextClicked}>
                    <img style={{ width: '30px', height: '30px' }} alt='Next' src={rightArrow} />
                </button>
            </div>
            <div className={classes.cross} onClick={props.clicked}>
                <h1>X</h1>
            </div>
            <div className={classes.Buttons} >
                <DrawerToggleSideContent />
            </div>
            <img id='img1'
                src={props.imageClicked.urlArr[Object.keys(props.imageClicked.urlArr)[presentIndex]]}
                className='card-img-top' style={{
                    width: isZoomed ? '120%' : window.innerWidth < 500 ? '90%' : '100%',
                    height: isZoomed ? '120%' : window.innerWidth < 500 ? '90%' : '100%',
                    maxHeight: isZoomed ? '1000px' : '600px',
                    transition: isZoomed ? 'all 0.3s ease-out' : 'all 0.3s ease-in',
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                    objectFit: 'contain',
                    marginLeft: window.innerWidth < 500 ? null : '-13%',
                    marginRight: window.innerWidth < 500 ? '3%' : null,
                    marginTop: window.innerWidth < 500 ? squareImage ? '50%' : '10px' : squareImage ? '30%' : null,

                }}
                alt='' onClick={() => isZoomed ? zoomOut() : zoomIn()} />
        </div>
    )
}

export default withErrorHandler(modalImageViewer, axios);