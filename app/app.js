/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { ConnectedRouter } from 'connected-react-router';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import localForage from 'localforage';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

import request from 'utils/request';
import { BrowserRouter as Router } from 'react-router-dom';
// Import root app
import App from 'containers/App';
import 'react-toastify/dist/ReactToastify.css';
// Import Language Provider

import LanguageProvider from 'containers/LanguageProvider';
import PageLoader from 'components/PageLoader';
import './css/toast/main.css';
import { ToastContainer, Slide } from 'react-toastify';
import setupAxiosRefreshTokenInterceptor from 'utils/interceptor';
import axios from 'utils/request_instance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */
import { refreshedUser, refreshUserError } from './containers/App/user/actions';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

const msalInstance = new PublicClientApplication(msalConfig);

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

class Preloader extends React.Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    const encryptor = encryptTransform({
      secretKey: 'my-super-secret-key',
    });
    window.persistor = persistStore(
      this.props.store,
      {
        storage: localForage,
        whitelist: ['user'],
        transforms: [encryptor],
      },
      () => {
        this.setState({ rehydrated: true });
        window.storeLoaded = true;
        const newRefreshMethod = false;
        if (this.props.store && newRefreshMethod) {
          setupAxiosRefreshTokenInterceptor(axios, this.props.store);
        } else if (this.props.store.getState().user.token) {
          request(`/auth/refresh/`, {}, 'post', {
            token: this.props.store.getState().user.token,
          })
            .then(res => {
              const dateNow = new Date();
              const utc =
                dateNow.getTime() + dateNow.getTimezoneOffset() * 60000;
              const time = utc + 3600000 * 3;
              this.props.store.dispatch(
                refreshedUser({ token: res.data.token, lastRefreshed: time }),
              );
            })
            .catch(error => {
              if (error.response.data)
                this.props.store.dispatch(
                  refreshUserError(error.response.data.detail),
                );
              else this.props.store.dispatch(refreshUserError(error.message));
            });
        }
      },
    );
  }

  render() {
    if (!this.state.rehydrated) {
      return <PageLoader />;
    }
    // eslint-disable-next-line no-unused-vars
    // history.listen(_ => {
    //   window.scrollTo(0, 0);
    // });
    return (
      <Provider store={store}>
        <LanguageProvider messages={this.props.messages}>
          <ConnectedRouter history={history}>
            <Router>
              <MsalProvider instance={msalInstance}>
                <App />
              </MsalProvider>
            </Router>
            <ToastContainer
              position="bottom-left"
              autoClose={4000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Slide}
            />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    );
  }
}

Preloader.propTypes = {
  messages: PropTypes.any,
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    getState: PropTypes.func,
  }),
};

const render = messages => {
  ReactDOM.render(<Preloader store={store} messages={messages} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
