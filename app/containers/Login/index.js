/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Input,
  Button,
  Form,
  Container,
  Segment,
  Header,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import { makeSelectUser } from '../App/user/selectors';
import reducer from './reducer';
import saga from './saga';
import { login } from './actions';
import './login.css';

export function Login({ loginPageUser, login, user }) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const [credenatials, setCredentials] = React.useState({
    email: '',
    password: '',
  });

  const submit = () => {
    loginPageUser(credenatials);
  };

  const handleChange = (e, { name, value }) => {
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  if (user && user.token) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Container style={{ padding: '3rem', paddingTop: '150px' }}>
        <Segment
          textAlign="center"
          style={{
            borderRadius: '50px',
            padding: '3rem',
            boxShadow: 'rgba(0, 96, 94, 0.64) 15px 15px 30px 15px',
            background: '#01081C',
          }}
        >
          <Header
            style={{ color: 'rgb(31, 154, 183)', fontSize: '30px' }}
            as="h2"
          >
            Login to VBR Labs Contracts Manager
          </Header>
          <Form style={{ padding: '5rem' }}>
            <Form.Field>
              <label style={{ marginLeft: '-45%', color: '#FFF' }}>Email</label>
              <Input
                style={{ width: '50%', height: '50px', borderRadius: '20px' }}
                onChange={handleChange}
                value={credenatials.username}
                placeholder="Email"
                name="email"
                type="email"
              />
            </Form.Field>
            <Form.Field>
              <label style={{ marginLeft: '-42%', color: '#FFF' }}>
                Password
              </label>
              <Input
                style={{ width: '50%', height: '50px', borderRadius: '20px' }}
                onChange={handleChange}
                value={credenatials.password}
                placeholder="Password"
                name="password"
                type="password"
              />
            </Form.Field>
            <Button className="login-page-btn" type="submit" onClick={submit}>
              Login
            </Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
}

Login.propTypes = {
  loginPageUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginPageUser: data => dispatch(login(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
