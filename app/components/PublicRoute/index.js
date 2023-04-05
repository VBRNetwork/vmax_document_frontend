/**
 *
 * PublicRoute
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Route } from 'react-router-dom';
import MainLayout from '../MainLayout';

function PublicRoute({
  component: Component,
  restricted,
  isAuthenticated,
  live,
  ...rest
}) {
  return (
    <>
      <Route
        {...rest}
        render={props => (
          <MainLayout match={props.match}>
            <>
              <Component {...props} />
            </>
          </MainLayout>
        )}
      />
    </>
  );
}

PublicRoute.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.any,
  restricted: PropTypes.any,
  live: PropTypes.any,
  match: PropTypes.any,
};

export default memo(PublicRoute);
