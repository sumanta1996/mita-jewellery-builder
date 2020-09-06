import React, { useState, useEffect } from 'react';
import classes from './ImgViewer.css';

const imgViewer = props => {
    const [imageStyle, setImageStyle] = useState({ width: '270px', height: '270px', objectFit: 'cover', borderRadius: '5px' });
    const [textStyle, setTextStyle] = useState({ color: '#d2ac69'});
    
    useEffect(() => {
        if(window.innerWidth < 500) {
            setImageStyle({...imageStyle, width: '100px', height: '100px'});
            setTextStyle({color: '#d2ac69', fontSize: '15px' });
        }
    }, [window.innerWidth]);

    return (
        <div className='column' onClick={props.clicked}>
            <div className={classes.card} style={{ width: 'fit-content' }}>
                <img src={props.url} className='card-img-top' style={imageStyle} alt='' />
                <div className="card-body" style={{ padding: 0, marginTop: '10px', textAlign: 'center' }}>
                    <h5 className="card-title" style={textStyle}>{props.title}</h5>
                    <h5 className="card-title" style={{ ...textStyle, fontWeight: 'bold' }}>&#x20B9; {props.price}</h5>
                </div>
            </div>
        </div>
    );
}

export default imgViewer;