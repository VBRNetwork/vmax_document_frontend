/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainLayout from 'components/MainLayout';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  restricted,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated && !restricted)
        return (
          <MainLayout match={props.match}>
            <>
              <Component {...props} />
            </>
          </MainLayout>
        );
      if (restricted) return <Redirect to="/login" />;
      return <Redirect to="/login" />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.any,
};

export default PrivateRoute;
