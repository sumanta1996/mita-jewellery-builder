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
    const [marginTops, setMarginTops] = useState(0);

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

    useEffect (() => {
        if(document.getElementById('img1')) {
            var width = document.getElementById('img1').naturalWidth;
            var height = document.getElementById('img1').naturalHeight;
            if(width > height) {
                console.log('Square Image');
                if(window.innerWidth > 500) {
                    console.log('Laptop Screen');
                }else {
                    console.log('Mobile Screen');
                    if(window.innerHeight < 800) {
                        setMarginTops('10%');
                    }else {
                        setMarginTops('22%');
                    }
                }
                //setSquareImage(true);
            }else {
                console.log('Not a square image');
                if(window.innerWidth> 500) {
                    console.log('Laptop Screen');
                    setMarginTops('10px');
                }else {
                    console.log('Mobile Screen');
                    if(window.innerHeight<800) {
                        console.log('Mobile Screen size less than 800')
                        setMarginTops('5%')
                    }else {
                        console.log('Mobile Screen size greater than 800')
                        setMarginTops('20%')
                    }
                }
                setSquareImage(false);
            }
        }
    })

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
            {presentIndex === 0 ? null : <div className={classes.PrevButton}>
                <button type="button" className="btn btn-light" disabled={presentIndex === 0} onClick={prevClicked}>
                    <img style={{ width: '30px', height: '30px' }} alt='Previous' src={leftArrow} />
                </button>
            </div>}
            {presentIndex === (props.size - 1) ? null : <div className={classes.NextButton}>
                <button type="button" className="btn btn-light" disabled={presentIndex === (props.size - 1)} onClick={nextClicked}>
                    <img style={{ width: '30px', height: '30px' }} alt='Next' src={rightArrow} />
                </button>
            </div>}
            <div className={classes.cross} onClick={props.clicked}>
                <h1>X</h1>
            </div>
            <div className={classes.Buttons} >
                <DrawerToggleSideContent />
            </div>
            <img id='img1'
                src={props.imageClicked.urlArr[Object.keys(props.imageClicked.urlArr)[presentIndex]]}
                className='card-img-top' style={{
                    width: isZoomed ? (window.innerWidth < 500 ? (window.innerWidth + 100) : '700px') : 
                                    (window.innerWidth < 500 ? '500px' : '550px'),
                    height: isZoomed ? '700px' : window.innerWidth < 500 ? '500px' : '550px',
                    maxHeight: isZoomed ? '1000px' : '600px',
                    transition: isZoomed ? 'all 0.3s ease-out' : 'all 0.3s ease-in',
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                    objectFit: 'contain',
                    marginLeft: window.innerWidth < 500 ? (isZoomed ? null : '-21%') : '-13%',
                    marginRight: window.innerWidth < 500 ? (isZoomed ? null : '3%') : null,
                    marginTop: marginTops,
                }}
                alt='' onClick={() => isZoomed ? zoomOut() : zoomIn()} />
        </div>
    )
}

export default withErrorHandler(modalImageViewer, axios);