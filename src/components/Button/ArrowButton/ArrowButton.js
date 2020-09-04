import React from 'react';
import classes from './ArrowButton.css';

const arrowButton = (props) => (
    <button type="button" className="btn btn-default" onClick={props.clicked} style={{zIndex: '500'}}>
        <span className='glyphicon glyphicon-menu-right' aria-hidden="true"></span>
    </button>
);

export default arrowButton;