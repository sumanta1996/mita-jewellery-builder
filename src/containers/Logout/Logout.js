import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render () {
        return <Redirect to='/' />
    }
}

const dispatchPropsToState = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, dispatchPropsToState)(Logout));