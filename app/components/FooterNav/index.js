/**
 *
 * FooterNav
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';
import Logo from '../../images/vbrlabs_logo.png';

function FooterNav() {
  return (
    <div>
      <Segment
        inverted
        vertical
        style={{
          padding: '5em 0em',
          backgroundColor: 'rgb(1, 8, 28)',
        }}
      >
        <Container textAlign="center">
          <Image centered size="small" src={Logo} />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
}

FooterNav.propTypes = {};

export default memo(FooterNav);
