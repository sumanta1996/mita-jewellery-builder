import React from 'react';
import classes from './LikedPeople.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxillary from '../../hoc/Auxillary';

const likedPeople = props => {
    let attachedClass = [classes.MiddleDrawer, classes.Close];
    if (props.open) {
        attachedClass = [classes.MiddleDrawer, classes.Open];
    }

    return (
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={classes.Container}>
                <div className={attachedClass.join(' ')}>
                    {props.children}
                </div>
                <div className={classes.Cover}></div>
            </div>
        </Auxillary>

    );
}

export default likedPeople;