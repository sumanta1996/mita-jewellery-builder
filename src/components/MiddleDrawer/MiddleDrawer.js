import React, { useState } from 'react';
import Auxillary from '../../hoc/Auxillary';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import SideDrawer from '../SideDrawer/SideDrawer';

const middleDrawer = props => {
    const [showMiddleDrawer, setShowMiddleDrawer] = useState(false);

    const middleDrawerShowHandler = () => {
        setShowMiddleDrawer(true);
    }

    const middleDrawerCloseHandler = () => {
        setShowMiddleDrawer(false)
    }
    return (
        <Auxillary>
            {props.path === '/' ? <DrawerToggle middle clicked={middleDrawerShowHandler} /> : null}
            <SideDrawer middle
                closed={middleDrawerCloseHandler}
                open={showMiddleDrawer} />
        </Auxillary>

    )
}

export default middleDrawer;