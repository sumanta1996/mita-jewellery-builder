import React, { useContext } from 'react';
import classes from './DrawerToggleSideContent.css';
import { SideToggleContext } from '../../../context/sideToggleContext';

const drawerToggleSideContent = props => {
    const sideToggleContext = useContext(SideToggleContext);
    let attachedClasses = [classes.button];
    if(sideToggleContext.showSideContent) {
        attachedClasses.push(classes.overlaped)
    }

    return (
        <button className={attachedClasses.join(' ')}
            onClick={() => sideToggleContext.drawerToggleHandler()}>
            <span>{!sideToggleContext.showSideContent ? 'Info' : 'X'} </span>
        </button>
    );
}

export default drawerToggleSideContent;