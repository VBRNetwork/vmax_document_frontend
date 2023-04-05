/**
 *
 * CompanyManagement
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
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Backdrop,
  CircularProgress,
  Box,
} from '@mui/material';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectCompanyManagement,
  makeSelectTeams,
  makeSelectDepts,
  makeSelectTeamMembers,
  makeSelectLastTeam,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getTeams,
  getDepartments,
  getTeamMembers,
  getLastTeam,
} from './actions';

export function CompanyManagement({
  lastTeam,
  getLastTeamPage,
  teamMembers,
  getTeamMembersPage,
  teams,
  getTeamsPage,
  departments,
  getDeptsPage,
}) {
  useInjectReducer({ key: 'companyManagement', reducer });
  useInjectSaga({ key: 'companyManagement', saga });

  React.useEffect(() => {
    getTeamsPage();
    getDeptsPage();
    getTeamMembersPage();
    getLastTeamPage();
  }, []);

  if (
    lastTeam.loading ||
    teams.loading ||
    departments.loading ||
    teamMembers.loading
  ) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (lastTeam.error || teams.error || departments.error || teamMembers.error) {
    return (
      <div style={{ fontSize: '30px', paddingTop: '100px' }}>
        Something went wrong!
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>CompanyManagement</title>
        <meta name="description" content="Description of CompanyManagement" />
      </Helmet>
      <Container maxWidth="xxl" style={{ paddingTop: '100px' }}>
        <Box style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <Typography
            style={{ color: 'rgb(31, 154, 183)' }}
            variant="h3"
            component="h1"
          >
            Organizational Chart
          </Typography>
        </Box>
        <Tree
          lineWidth="2px"
          lineColor="rgb(31, 154, 183)"
          lineBorderRadius="10px"
          lineHeight="50px"
          label={
            <Card
              sx={{ maxWidth: 345 }}
              style={{
                backgroundColor: '#3f51b5',
                width: '345px',
                marginLeft: '50rem',
                padding: '1rem',
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: '#2b2929', width: 56, height: 56 }}>
                    {lastTeam.results.map(team => (
                      <div>{team.team_name}</div>
                    ))}
                  </Avatar>
                }
                title={
                  <Typography variant="h5" component="div">
                    {lastTeam.results.map(team => (
                      <div>{team.team_name}</div>
                    ))}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2">
                    {lastTeam.results.map(team => (
                      <div>{team.team_description}</div>
                    ))}
                  </Typography>
                }
              />
            </Card>
          }
        >
          {teamMembers.results.map(teamMember => (
            <>
              <TreeNode
                label={
                  <Card style={{ backgroundColor: '#3f51b5' }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: '#2b2929', width: 56, height: 56 }}
                          src={teamMember.user.avatar}
                          alt={`${teamMember.user.first_name}
                          ${teamMember.user.last_name}`}
                        />
                      }
                      title={
                        <Typography variant="h5" component="div">
                          {teamMember.user.first_name}{' '}
                          {teamMember.user.last_name}
                        </Typography>
                      }
                      subheader={
                        <Typography variant="body2">
                          {teamMember.department.department_name}
                        </Typography>
                      }
                    />
                  </Card>
                }
              >
                {teamMember.children.length > 0 &&
                  teamMember.children.map(child => (
                    <TreeNode
                      label={
                        <Card style={{ backgroundColor: '#3f51b5' }}>
                          <CardHeader
                            avatar={
                              <Avatar
                                sx={{
                                  bgcolor: '#2b2929',
                                  width: 56,
                                  height: 56,
                                }}
                                src={child.user.avatar}
                                alt={`${child.user.first_name}
                                  ${child.user.last_name}`}
                              />
                            }
                            title={
                              <Typography variant="h5" component="div">
                                {child.user.first_name} {child.user.last_name}
                              </Typography>
                            }
                            subheader={
                              <Typography variant="body2">
                                {child.department.department_name}
                              </Typography>
                            }
                          />
                        </Card>
                      }
                    />
                  ))}
              </TreeNode>
            </>
          ))}
        </Tree>
      </Container>
    </div>
  );
}

CompanyManagement.propTypes = {
  teams: PropTypes.object,
  getTeamsPage: PropTypes.func.isRequired,
  departments: PropTypes.object,
  getDeptsPage: PropTypes.func.isRequired,
  getTeamMembersPage: PropTypes.func.isRequired,
  teamMembers: PropTypes.object,
  getLastTeamPage: PropTypes.func.isRequired,
  lastTeam: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  companyManagement: makeSelectCompanyManagement(),
  teams: makeSelectTeams(),
  departments: makeSelectDepts(),
  lastTeam: makeSelectLastTeam(),
  teamMembers: makeSelectTeamMembers(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getTeamsPage: () => dispatch(getTeams()),
    getDeptsPage: () => dispatch(getDepartments()),
    getTeamMembersPage: () => dispatch(getTeamMembers()),
    getLastTeamPage: () => dispatch(getLastTeam()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompanyManagement);
