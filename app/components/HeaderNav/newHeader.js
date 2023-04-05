/* eslint-disable react/no-multi-comp */
/**
 *
 * HeaderNav
 *
 */

import React, { memo, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  Container,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Responsive,
  Dropdown,
  Image,
  Header,
} from 'semantic-ui-react';
import { makeSelectUser } from 'containers/App/user/selectors';

import { logoutUser } from 'containers/App/user/actions';
import StandardUserImage from '../../images/sample-avatar.jpg';
import './header.css';
const Logo =
  'https://netopia-payments.com/core/assets/5993428bab/images/logo.svg';

function DesktopContainer({ children, user, options }) {
  const [fixed, setFixed] = React.useState(false);

  const hideFixedMenu = () => setFixed({ fixed: false });

  const showFixedMenu = () => setFixed({ fixed: true });
  console.log('slobozInGat', user);

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment
          inverted
          textAlign="center"
          style={{ padding: '1em 0em' }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
            style={{ borderWidth: '0', borderBottom: 'unset' }}
          >
            <Container fluid>
              <Menu.Item as={Link} to="/">
                <Image size="small" src={Logo} />
              </Menu.Item>
              {user.token && (
                <>
                  <Menu.Item as={Link} to="/dashboard">
                    <Header
                      as="h3"
                      style={{ color: '#FFF', fontWeight: '400' }}
                    >
                      Dashboard
                    </Header>
                  </Menu.Item>
                </>
              )}
              {user.token ? (
                <>
                  <Menu.Item position="right" style={{ marginLeft: '5%' }}>
                    <Dropdown
                      inline
                      style={{ color: '#FFF' }}
                      trigger={
                        <span style={{ color: '#FFF' }}>
                          <Image
                            avatar
                            size="mini"
                            src={
                              user.user.image
                                ? user.user.image
                                : StandardUserImage
                            }
                            // src={StandardUserImage}
                          />{' '}
                          Hello {user.user.first_name}!
                        </span>
                      }
                      options={options}
                      icon={null}
                    />
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item position="right">
                    <Button as={Link} to="/login" inverted={!fixed}>
                      Log in
                    </Button>
                  </Menu.Item>
                  <Menu.Item fitted="vertically">
                    <Button as={Link} to="/register">
                      Join Now
                    </Button>
                  </Menu.Item>
                </>
              )}
            </Container>
          </Menu>
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  );
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
  options: PropTypes.any,
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

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, isAuthenticated, user } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        maxWidth={Responsive.onlyMobile.maxWidth}
        style={{ display: 'contents' }}
      >
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  {user.token ? (
                    <>
                      <Dropdown
                        direction="left"
                        trigger={
                          <span>
                            <Image
                              avatar
                              size="mini"
                              // src={
                              //   this.props.user.user.profile.image
                              //     ? this.props.user.user.profile.image
                              //     : StandardUserImage
                              // }
                              src={StandardUserImage}
                            />
                          </span>
                        }
                        options={this.props.options}
                        pointing="top left"
                        inverted
                        icon={null}
                      />
                    </>
                  ) : (
                    <>
                      <Menu.Item position="right">
                        <Button as="a" inverted>
                          Log in
                        </Button>
                        <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                          Sign Up
                        </Button>
                      </Menu.Item>
                    </>
                  )}
                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.any,
  options: PropTypes.any,
  user: PropTypes.shape({
    token: PropTypes.any,
    user: PropTypes.shape({
      profile: PropTypes.shape({
        image: PropTypes.any,
      }),
    }),
  }),
};

const HeaderNavNew = ({ children, logoutUserPage, currentUser, match }) => {
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
    <>
      <DesktopContainer
        logoutUserPage={logoutUserPage}
        user={currentUser}
        options={options}
        match={match}
      >
        {children}
      </DesktopContainer>
      <MobileContainer
        logoutUserPage={logoutUserPage}
        user={currentUser}
        options={options}
      >
        {children}
      </MobileContainer>
    </>
  );
};

HeaderNavNew.propTypes = {
  children: PropTypes.node,
  logoutUserPage: PropTypes.func.isRequired,
  match: PropTypes.any,
  currentUser: PropTypes.shape({
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
  currentUser: makeSelectUser(),
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
)(HeaderNavNew);
