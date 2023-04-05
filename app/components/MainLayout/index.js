/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/**
 *
 * MainLayout
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Box, Paper, Stack, Typography, Grid } from '@mui/material';
import FooterNav from '../FooterNav/Loadable';
// import HeaderNavNew from '../HeaderNav/newHeader';
import HeaderNav from '../HeaderNav/Loadable';
import './mainlayout.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function MainLayout({ children, match, currentUser }) {
  return (
    <Container style={{ overflow: 'hidden', background: '#01081C' }}>
      <Helmet titleTemplate="%s | Platform" defaultTitle="Platform" />
      <HeaderNav children={children} match={match} />
      {/* <SidebarMenu children={children} /> */}

      {children}
      <FooterNav />
    </Container>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  match: PropTypes.any,
};

export default memo(MainLayout);
