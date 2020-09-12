import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import firebase from "firebase";
import imageSetReducer from './store/reducers/images';
import authReducer from './store/reducers/auth';
import adminConsoleReducer from './store/reducers/adminConsole';
import usersReducer from './store/reducers/users';
import cartReducer from './store/reducers/cart';
import SideToggleContextProvider from './context/sideToggleContext';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  apiKey: "AIzaSyBzpmGpErQqjFeR04n5hFnTT0f8qa-WSW0",
  authDomain: "mita-jewellery.firebaseapp.com",
  databaseURL: "https://mita-jewellery.firebaseio.com",
  storageBucket: "mita-jewellery.appspot.com"
};
firebase.initializeApp(config);

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  images: imageSetReducer,
  auth: authReducer,
  adminConsole: adminConsoleReducer,
  users: usersReducer,
  cart: cartReducer
});

const persistConfig = {
  key: 'cart',
  storage: storage,
  whitelist: ['cart', 'auth', 'adminConsole']
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
persistStore(store);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <SideToggleContextProvider>
          <App />
        </SideToggleContextProvider>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
