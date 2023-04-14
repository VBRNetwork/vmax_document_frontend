/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Icon,
  Button,
  Segment,
  Header,
} from 'semantic-ui-react';
import { Avatar, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import Logo from '../../images/vbrlabs_logo.png';
import { makeSelectUser } from '../../containers/App/user/selectors';
import { logoutUser } from '../../containers/App/user/actions';
import StandardUserImage from '../../images/sample-avatar.jpg';
import './header.css';

const countryOptions = [
  { key: 'us', value: 'us', flag: 'us', text: 'English' },
  { key: 'fr', value: 'fr', flag: 'fr', text: 'French' },
  { key: 'de', vdeue: 'de', flag: 'de', text: 'Deutsch' },
  { key: 'es', value: 'es', flag: 'es', text: 'Spanish' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
];

function HeaderNav({ children, match, user, logoutUserPage }) {
  const handleLogOut = () => {
    logoutUserPage();
  };
  const options = [
    {
      key: 'user',
      text: 'Dashboard',
      icon: 'dashboard',
      as: Link,
      to: '/dashboard',
      color: 'black',
    },
    {
      key: 'sign-out',
      text: 'Sign Out',
      icon: 'sign out',
      color: 'black',
      onClick: handleLogOut,
    },
  ];

  return (
    <div>
      <Menu style={{ background: 'rgb(1, 8, 28)' }} fixed="top">
        <Container fluid>
          <Menu.Item style={{ color: '#FFF' }} as={Link} to="/" header>
            <Image size="small" src={Logo} style={{ marginRight: '1.5em' }} />
          </Menu.Item>
          {user.token && (
            <>
              <Menu.Item
                style={{ color: '#FFF', fontWeight: '700' }}
                as={Link}
                to="/"
              >
                Check Documents List
              </Menu.Item>
              <Menu.Item
                style={{ color: '#FFF', fontWeight: '700' }}
                as={Link}
                to="/partners"
              >
                Partners
              </Menu.Item>
              <Menu.Item
                style={{ color: '#FFF', fontWeight: '700' }}
                as={Link}
                to="/recruitments"
              >
                Recruitments
              </Menu.Item>
              <Menu.Item
                style={{ color: '#FFF', fontWeight: '700' }}
                as={Link}
                to="/payroll"
              >
                <span style={{ color: 'red', marginLeft: '1rem' }}>BETA</span>
                Payroll Management
              </Menu.Item>
              <Menu.Item
                style={{ color: '#FFF', fontWeight: '700' }}
                as={Link}
                to="/company-management"
              >
                <span style={{ color: 'red', marginLeft: '1rem' }}>BETA</span>
                Company Management
              </Menu.Item>
              <Menu.Item position="right">
                <Dropdown
                  inline
                  style={{ color: '#FFF' }}
                  trigger={
                    <>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          alt={`${user.user.first_name} ${user.user.last_name}`}
                          src={user.user.avatar}
                          sx={{
                            width: 66,
                            height: 66,
                            bgcolor: deepOrange[500],
                          }}
                        />{' '}
                        <span style={{ color: '#FFF', marginTop: '1.5rem' }}>
                          Hello {user.user.first_name}!
                        </span>
                      </Stack>
                    </>
                  }
                  options={options}
                  icon={null}
                />
              </Menu.Item>
            </>
          )}
          {!user.token && (
            <>
              <Menu.Item position="right">
                <Button className="login-btn" as={Link} to="/login">
                  Log in
                </Button>
              </Menu.Item>
            </>
          )}
        </Container>
      </Menu>
    </div>
  );
}

HeaderNav.propTypes = {
  children: PropTypes.node.isRequired,
  match: PropTypes.any,
  logoutUserPage: PropTypes.func,
  setToggle: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.any,
    user: PropTypes.shape({
      first_name: PropTypes.any,
      profile: PropTypes.shape({
        image: PropTypes.any,
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
    logoutUserPage: () => dispatch(logoutUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HeaderNav);
