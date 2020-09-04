import React, { Component } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer : true});
    }

    render () {
        return (
            <Auxillary>
                <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerOpenHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <div className={classes.Layout}>
                    {this.props.children}
                </div>
            </Auxillary>
        )
    }
}

const mapPropsToState = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default withRouter(connect(mapPropsToState)(Layout));