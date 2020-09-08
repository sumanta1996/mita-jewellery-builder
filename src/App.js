import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import Homepage from './containers/Homepage/Homepage';
import { Route, Switch, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import AdminConsole from './containers/AdminConsole/AdminConsole';
import { connect } from 'react-redux';
import Logout from './containers/Logout/Logout';
import ContactUs from './containers/ContactUs/ContactUs';

class App extends Component {



  render() {
    return (
      <div>
          <Layout>
            <Switch>
              {this.props.isAuth ? <Route path='/admin/console' component={AdminConsole} /> : null}
              <Route path='/admin' component={Auth} />
              <Route path='/logout' component={Logout} />
              <Route path='/contactus' component={ContactUs} />
              <Route path='/:id' component={Homepage} />
            </Switch>
          </Layout>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default withRouter(connect(mapPropsToState)(App));
