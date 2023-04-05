/**
 *
 * OrganizationalChart
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Container,
  Segment,
  Image,
  Icon,
  Header,
  Button,
} from 'semantic-ui-react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectOrganizationalChart, makeSelectTeams } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getTeams } from './actions';

import Diagram from './diagram';

export function OrganizationalChart({ teams, getTeamsPage }) {
  useInjectReducer({ key: 'organizationalChart', reducer });
  useInjectSaga({ key: 'organizationalChart', saga });

  React.useEffect(() => {
    getTeamsPage();
  }, []);

  return (
    <div>
      <Helmet>
        <title>OrganizationalChart</title>
        <meta name="description" content="Description of OrganizationalChart" />
      </Helmet>
      <div style={{ height: '22.5rem' }}>
        <Header style={{ fontSize: '30px' }} textAlign="center">
          Company Organizational Chart
        </Header>
        {!teams.loading && !teams.error && (
          <>
            <Diagram teams={teams} />
            {teams.results.map(team => (
              <>
                <div style={{ padding: '10px', color: 'black' }}>
                  {team.team_name}
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

OrganizationalChart.propTypes = {
  organizations: PropTypes.any,
  getTeamsPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizationalChart(),
  teams: makeSelectTeams(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getTeamsPage: () => dispatch(getTeams()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationalChart);
