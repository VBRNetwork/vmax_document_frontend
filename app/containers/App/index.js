/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import AddContract from 'containers/AddContract/Loadable';
import PayrollManagement from 'containers/PayrollManagement/Loadable';
import CompanyManagement from 'containers/CompanyManagement/Loadable';
import AuthRedirect from 'components/AuthRedirect/Loadable';
import OrganizationalChart from '../OrganizationalChart';
import HumanResources from '../HumanResources';
import Appointments from '../Appointments';
import AddPartners from '../AddPartners';
import Recruitment from '../Recruitment';
import PublicRoute from '../../components/PublicRoute/Loadable';
import GlobalStyle from '../../global-styles';
import 'semantic-ui-css/semantic.min.css';
import userSaga from './user/saga';
import userReducer from './user/reducer';
import { makeSelectUser } from './user/selectors';
import 'beautiful-react-diagrams/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PrivateRoute from '../../components/PrivateRoute';

export function App({ user }) {
  useInjectSaga({ key: 'user', saga: userSaga });
  useInjectReducer({ key: 'user', reducer: userReducer });

  console.log('slobozInGat', user);
  const isAuthenticated = user && !!user.token;
  console.log('isAuthenticated', isAuthenticated);

  return (
    <div>
      <Switch>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/"
          component={HomePage}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/add-contract"
          component={AddContract}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/partners"
          component={AddPartners}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/recruitments"
          component={Recruitment}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/organizational-chart"
          component={OrganizationalChart}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/payroll"
          component={PayrollManagement}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/company-management"
          component={CompanyManagement}
        />
        <PublicRoute
          // isAuthenticated={isAuthenticated}
          exact
          path="/auth/login"
          component={AuthRedirect}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/human-resources"
          component={HumanResources}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/appointments"
          component={Appointments}
        />

        <PublicRoute
          // isAuthenticated={isAuthenticated}
          exact
          path="/login"
          component={Login}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  user: PropTypes.shape({
    token: PropTypes.any,
    user: PropTypes.shape({
      id: PropTypes.any,
      profile: PropTypes.shape({
        completed: PropTypes.any,
      }),
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
