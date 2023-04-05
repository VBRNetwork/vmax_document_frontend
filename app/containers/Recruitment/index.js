/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Recruitment
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
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Backdrop,
  CircularProgress,
  Button,
  Drawer,
} from '@mui/material';
import { Modal, Form } from 'semantic-ui-react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectRecruitment,
  makeSelectSaveNewRecruitment,
  makeSelectUpdateRecruitment,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getRecruitments,
  saveNewRecruitment,
  updateRecruitment,
} from './actions';

export function Recruitment({
  recruitments,
  getRecruitmentsPage,
  saveNewRecruitmentPage,
  updateRecruitmentPage,
}) {
  useInjectReducer({ key: 'recruitment', reducer });
  useInjectSaga({ key: 'recruitment', saga });

  const [recruitment, setRecruitment] = React.useState({
    recruitment_name: '',
    recruitment_job_title: '',
    recruitment_job_description: '',
    recruitment_user_name: '',
    recruitment_user_age: '',
    recruitment_user_experience: '',
    recruitment_user_last_company: '',
    recruitment_user_last_education: '',
  });

  const [showRecruitment, setShowRecruitment] = React.useState(-1);
  const [addingNewRecruitment, setAddingNewRecruitment] = React.useState(false);
  const [
    currentEditingRecruitment,
    setCurrentEditingRecruitment,
  ] = React.useState(-1);

  const [
    currentEditingRecruitmentInfo,
    setCurrentEditingRecruitmentInfo,
  ] = React.useState({
    recruitment_name: '',
    recruitment_job_title: '',
    recruitment_job_description: '',
    recruitment_user_name: '',
    recruitment_user_age: '',
    recruitment_user_experience: '',
    recruitment_user_last_company: '',
    recruitment_user_last_education: '',
  });

  React.useEffect(() => {
    getRecruitmentsPage();
  }, []);

  const handleEditRecruitment = e => {
    const { name, value } = e.target;
    setCurrentEditingRecruitmentInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveNewRecruitment = () => {
    saveNewRecruitmentPage(recruitment);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setRecruitment(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdateRecruitment = () => {
    updateRecruitmentPage(
      currentEditingRecruitment,
      currentEditingRecruitmentInfo,
    );
  };

  const theModal = item => (
    <Modal
      id={item.id}
      key={item.id}
      open={showRecruitment === item.id}
      onClose={() => setShowRecruitment(-1)}
      onOpen={() => setShowRecruitment(item.id)}
      trigger={
        <Button
          variant="outlined"
          style={{
            fontWeight: '400',
            color: 'rgb(29, 114, 106)',
            cursor: 'pointer',
            fontSize: '1rem',
            border: '1px solid rgb(29, 114, 106)',
          }}
        >
          {item.recruitment_name}
        </Button>
      }
    >
      <Modal.Header
        style={{
          background: 'rgb(1, 8, 28)',
          color: '#FFF',
          textAlign: 'center',
        }}
      >
        {' '}
        {item.recruitment_name} - RECRUITMENT
      </Modal.Header>
      <Modal.Content style={{ background: 'rgb(1, 8, 28)' }} scrolling>
        <Modal.Description>
          <div style={{ marginLeft: '10rem' }}>TEST</div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

  if (recruitments.loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (recruitments.error) {
    return (
      <div style={{ marginTop: '7rem', textAlgin: 'center' }}>
        Error! {recruitments.error.message}
      </div>
    );
  }

  return (
    <div style={{ background: 'rgb(1, 8, 28)' }}>
      <Helmet>
        <title>Recruitment</title>
        <meta name="description" content="Description of Recruitment" />
      </Helmet>
      <Container
        style={{
          background: 'rgb(1, 8, 28)',
          marginTop: '7rem',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Box style={{ textAlign: 'center' }}>
          <Typography
            style={{ color: 'rgb(31, 154, 183)', marginBottom: '3rem' }}
            variant="h2"
            component="h1"
            gutterBottom
          >
            Recruitment Manager
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            style={{
              fontWeight: '400',
              color: 'rgb(31, 154, 183)',
              cursor: 'pointer',
              fontSize: '1rem',
              border: '1px solid rgb(31, 154, 183)',
              height: '4rem',
            }}
            onClick={() => setAddingNewRecruitment(true)}
          >
            Add New Recruitment
          </Button>
          <TableContainer
            style={{ background: 'rgb(1, 8, 28)' }}
            component={Paper}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="large"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#FFF' }}>
                    Recruitment Name
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }} align="right">
                    Recruitment Job Title
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }} align="right">
                    Recruitment Job Description
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }} align="right">
                    Recruitment User Name
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }} align="right">
                    Recruitment User Age
                  </TableCell>
                  {currentEditingRecruitment === -1 ? (
                    <>
                      <TableCell style={{ color: '#FFF' }} align="right">
                        Recruitment User Experience
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }} align="right">
                        Recruitment User Last Company
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }} align="right">
                        Recruitment User Last Education
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }} align="right">
                        View Full Recruitment
                      </TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                  <TableCell style={{ color: '#FFF' }} align="right">
                    {currentEditingRecruitment === -1
                      ? 'Edit Recruitment'
                      : 'Save Recruitment'}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recruitments.results.map(item => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      style={{ color: '#FFF' }}
                      component="th"
                      scope="row"
                    >
                      {currentEditingRecruitment === item.id ? (
                        <>
                          <input
                            name="recruitment_name"
                            id="recruitment_name"
                            type="text"
                            value={
                              currentEditingRecruitmentInfo.recruitment_name
                            }
                            onChange={handleEditRecruitment}
                          />
                        </>
                      ) : (
                        item.recruitment_name
                      )}
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }} align="right">
                      {currentEditingRecruitment === item.id ? (
                        <>
                          <input
                            name="recruitment_job_title"
                            id="recruitment_job_title"
                            type="text"
                            value={
                              currentEditingRecruitmentInfo.recruitment_job_title
                            }
                            onChange={handleEditRecruitment}
                          />
                        </>
                      ) : (
                        item.recruitment_job_title
                      )}
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }} align="right">
                      {currentEditingRecruitment === item.id ? (
                        <>
                          <input
                            name="recruitment_job_description"
                            id="recruitment_job_description"
                            type="text"
                            value={
                              currentEditingRecruitmentInfo.recruitment_job_description
                            }
                            onChange={handleEditRecruitment}
                          />
                        </>
                      ) : (
                        item.recruitment_job_description
                      )}
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }} align="right">
                      {currentEditingRecruitment === item.id ? (
                        <>
                          <input
                            name="recruitment_user_name"
                            id="recruitment_user_name"
                            type="text"
                            value={
                              currentEditingRecruitmentInfo.recruitment_user_name
                            }
                            onChange={handleEditRecruitment}
                          />
                        </>
                      ) : (
                        item.recruitment_user_name
                      )}
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }} align="right">
                      {currentEditingRecruitment === item.id ? (
                        <>
                          <input
                            name="recruitment_user_age"
                            id="recruitment_user_age"
                            type="text"
                            value={
                              currentEditingRecruitmentInfo.recruitment_user_age
                            }
                          />
                        </>
                      ) : (
                        item.recruitment_user_age
                      )}
                    </TableCell>
                    {currentEditingRecruitment === item.id ? (
                      <></>
                    ) : (
                      <TableCell style={{ color: '#FFF' }} align="right">
                        {item.recruitment_user_experience}
                      </TableCell>
                    )}
                    {currentEditingRecruitment === item.id ? (
                      <></>
                    ) : (
                      <TableCell style={{ color: '#FFF' }} align="right">
                        {item.recruitment_user_last_company}
                      </TableCell>
                    )}
                    {currentEditingRecruitment === item.id ? (
                      <></>
                    ) : (
                      <TableCell style={{ color: '#FFF' }} align="right">
                        {item.recruitment_user_last_education}
                      </TableCell>
                    )}
                    {currentEditingRecruitment === item.id ? (
                      <></>
                    ) : (
                      <>
                        <TableCell style={{ color: '#FFF' }} align="right">
                          {theModal(item)}
                        </TableCell>
                      </>
                    )}
                    <TableCell align="right">
                      {currentEditingRecruitment === item.id ? (
                        <>
                          <Button
                            style={{
                              color: '#FFF',
                              borderColor: '#FFF',
                              width: '8rem',
                              height: '3rem',
                              fontSize: '1rem',
                              fontWeight: '400',
                            }}
                            variant="outlined"
                            onClick={() => {
                              handleUpdateRecruitment(
                                currentEditingRecruitmentInfo,
                                item.id,
                              );
                            }}
                          >
                            SAVE
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            style={{
                              color: '#FFF',
                              borderColor: '#FFF',
                              width: '7rem',
                              height: '2.5rem',
                              fontSize: '1rem',
                              fontWeight: '400',
                            }}
                            variant="outlined"
                            onClick={() => {
                              setCurrentEditingRecruitment(item.id);
                              setCurrentEditingRecruitmentInfo({
                                recruitment_name: item.recruitment_name,
                                recruitment_job_title:
                                  item.recruitment_job_title,
                                recruitment_job_description:
                                  item.recruitment_job_description,
                                recruitment_user_name:
                                  item.recruitment_user_name,
                                recruitment_user_age: item.recruitment_user_age,
                                recruitment_user_experience:
                                  item.recruitment_user_experience,
                                recruitment_user_last_company:
                                  item.recruitment_user_last_company,
                                recruitment_user_last_education:
                                  item.recruitment_user_last_education,
                              });
                            }}
                          >
                            EDIT
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Drawer
          anchor="right"
          open={addingNewRecruitment}
          onClose={() => setAddingNewRecruitment(false)}
          transitionDuration={650}
          style={{
            background: 'rgba(60, 60, 60, 0.7)',
            color: '#FFF',
            padding: '2rem',
          }}
        >
          {
            <>
              <Container
                style={{
                  paddingTop: '100px',
                  paddingBottom: '14rem',
                  background: 'rgb(21, 22, 25)',
                  width: '30rem',
                }}
              >
                <Form style={{ marginTop: '5rem' }}>
            <Form.Field>
              <label
                style={{ color: '#FFF', marginBottom: '1rem' }}
                contro="partner_name"
              >
                Recruitment Name
              </label>
              <input
                id="recruitment_name"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="text"
                name="recruitment_name"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label
                style={{ color: '#FFF', marginBottom: '1rem' }}
                contro="partner_description"
              >
                Recruitment Job Title
              </label>
              <input
                id="recruitment_job_title"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="text"
                name="recruitment_job_title"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label
                style={{ color: '#FFF', marginBottom: '1rem' }}
                contro="partner_description"
              >
                Recruitment Job Description
              </label>
              <input
                id="recruitment_job_description"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="text"
                name="recruitment_job_description"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                Recruitment User Name
              </label>
              <input
                id="recruitment_user_name"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="text"
                name="recruitment_user_name"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                Recruitment User Age
              </label>
              <input
                id="recruitment_user_age"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="number"
                name="recruitment_user_age"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                Recruitment User Experience (Years)
              </label>
              <input
                id="recruitment_user_experience"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="number"
                name="recruitment_user_experience"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                Recruitment User Last Company
              </label>
              <input
                id="recruitment_user_last_company"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="text"
                name="recruitment_user_last_company"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                Recruitment User Lat Education
              </label>
              <input
                id="recruitment_user_last_education"
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="text"
                name="recruitment_user_last_education"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Button
                variant="outlined"
                style={{
                  backgroundColor: 'rgb(1, 8, 28)',
                  color: 'rgb(29, 114, 106)',
                  border: '1px solid rgb(29, 114, 106) ',
                  marginTop: '10px',
                  width: '250px',
                  height: '60px',
                }}
                onClick={() => handleSaveNewRecruitment(recruitment)}
              >
                Submit
              </Button>
            </Form.Field>
          </Form>
              </Container>
            </>
          }
        </Drawer>
      </Container>
    </div>
  );
}

Recruitment.propTypes = {
  recruitments: PropTypes.object.isRequired,
  getRecruitmentsPage: PropTypes.func.isRequired,
  saveNewRecruitmentPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recruitments: makeSelectRecruitment(),
  saveNewRecruitment: makeSelectSaveNewRecruitment(),
  updateRecruitment: makeSelectUpdateRecruitment(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRecruitmentsPage: () => dispatch(getRecruitments()),
    // saveNewRecruitmentPage: () => dispatch(saveNewRecruitmentPage()),
    updateRecruitmentPage: (id, recruitment) =>
      dispatch(updateRecruitment(id, recruitment)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Recruitment);
