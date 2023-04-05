/**
 *
 * AuthRedirect
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AuthRedirect() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AuthRedirect.propTypes = {};

export default memo(AuthRedirect);
