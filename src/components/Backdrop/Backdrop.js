import React from 'react';
import classes from './Backdrop.css';

const backdrop = props => (
    props.show ? <div 
                className={classes.Backdrop} 
                onClick={props.clicked}
                style={{
                    backgroundColor: props.isSideContent ? 'rgba(0, 0, 0, 0.94)' : 'rgba(0, 0, 0, 0.61)',
                    zIndex: props.darker ? '600' : '100'
                }}></div> : null
);

export default backdrop;