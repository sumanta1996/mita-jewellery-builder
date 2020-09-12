import React, { Suspense } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import Homepage from './containers/Homepage/Homepage';
import { Route, Switch, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import Logout from './containers/Logout/Logout';
import ContactUs from './containers/ContactUs/ContactUs';
import Notification from './containers/AdminConsole/Notification/Notification';

const app = props => {

  const AdminConsole = React.lazy(() => {
    return import('./containers/AdminConsole/AdminConsole');
  });

  const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders')
  });

  const OrderForm = React.lazy(() => {
    return import('./components/Cart/OrderForm/OrderForm')
  });

  return (
    <div>
      <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {props.isAuth ? <Route path='/admin/console' component={AdminConsole} /> : null}
          <Route path='/admin' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/contactus' component={ContactUs} />
          <Route path='/cart' component={Orders} />
          <Route path='/checkout' component={OrderForm} />
          <Route path='/orders' component={Notification} />
          <Route path='/:id' component={Homepage} />
        </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

const mapPropsToState = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default withRouter(connect(mapPropsToState)(app));
