/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * AddPartners
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
  Typography,
  Button,
  Box,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Backdrop,
  CircularProgress,
  FormControl,
  Drawer,
  Stack,
} from '@mui/material';
import { Form } from 'semantic-ui-react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectAddPartners,
  makeSelectSaveNewPartner,
  makeSelectUpdatePartner,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getPartners, saveNewPartner, updatePartner } from './actions';

export function AddPartners({
  partners,
  getPartnersPage,
  saveNewPartnerPage,
  updatePartnerPage,
}) {
  useInjectReducer({ key: 'addPartners', reducer });
  useInjectSaga({ key: 'addPartners', saga });

  const [partnerInfo, setPartnerInfo] = React.useState({
    partner_name: '',
    partner_description: '',
    partner_url: '',
    patner_entity_name: '',
    partner_administrator_name: '',
    partner_address: '',
  });

  const [currentEditingPartner, setCurrentEditingPartner] = React.useState(-1);
  const [addingNewPartner, setAddingNewPartner] = React.useState(false);
  const [
    currentEditingPartnerInfo,
    setCurrentEditingPartnerInfo,
  ] = React.useState({
    partner_name: '',
    partner_description: '',
    partner_url: '',
    patner_entity_name: '',
    partner_administrator_name: '',
    partner_address: '',
  });

  const handleEditPartner = e => {
    const { name, value } = e.target;
    setCurrentEditingPartnerInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditPartnerSubmit = () => {
    // console.log(currentEditingPartnerInfo);
    updatePartnerPage(currentEditingPartner, currentEditingPartnerInfo);
    // setCurrentEditingPartner(-1);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setPartnerInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const submitSaveNewPartner = () => {
    saveNewPartnerPage(partnerInfo);
  };

  React.useEffect(() => {
    getPartnersPage();
  }, []);

  if (partners.loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div style={{ background: 'rgb(1, 8, 28)' }}>
      <Helmet>
        <title>AddPartners</title>
        <meta name="description" content="Description of AddPartners" />
      </Helmet>
      <Container
        style={{
          background: 'rgb(1, 8, 28)',
          // height: '60vh',
          marginTop: '7rem',
          width: '100%',
          maxWidth: '90%',
        }}
        // maxWidth="xl"
      >
        <Typography
          variant="h2"
          style={{ color: '#1f9ab7', textAlign: 'center' }}
        >
          Existing Partners
        </Typography>
        <Box style={{ paddingTop: '5rem', marginBottom: '2rem' }}>
          <Button
            variant="outlined"
            onClick={() => setAddingNewPartner(true)}
            style={{
              borderColor: 'rgb(31, 154, 183)',
              color: 'rgb(31, 154, 183)',
              marginLeft: 'auto',
              height: '4rem',

            }}
          >
            Add New Partner
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
                  <TableCell style={{ color: '#FFF' }}>Partner Name</TableCell>
                  <TableCell style={{ color: '#FFF', width: '20%' }}>
                    Partner Description
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }}>
                    Partner Entity Name
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }}>
                    Partner Administrator Name
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }}>
                    Partner Address
                  </TableCell>
                  <TableCell style={{ color: '#FFF' }}>Partner URL</TableCell>
                  <TableCell style={{ color: '#FFF' }}>Edit Partner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partners.results.map(
                  item =>
                    item.partner_name !== null && (
                      <>
                        <TableRow
                          key={item.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            style={{ color: '#FFF' }}
                            component="th"
                            scope="row"
                          >
                            {currentEditingPartner === item.id ? (
                              <>
                                <input
                                  type="text"
                                  id="partner_name"
                                  name="partner_name"
                                  value={currentEditingPartnerInfo.partner_name}
                                  onChange={handleEditPartner}
                                />
                              </>
                            ) : (
                              item.partner_name
                            )}
                          </TableCell>
                          <TableCell style={{ color: '#FFF' }}>
                            {currentEditingPartner === item.id ? (
                              <>
                                <input
                                  type="text"
                                  id="partner_description"
                                  name="partner_description"
                                  value={
                                    currentEditingPartnerInfo.partner_description
                                  }
                                  onChange={handleEditPartner}
                                />
                              </>
                            ) : (
                              item.partner_description
                            )}
                          </TableCell>
                          <TableCell style={{ color: '#FFF' }}>
                            {currentEditingPartner === item.id ? (
                              <>
                                <input
                                  type="text"
                                  id="patner_entity_name"
                                  name="patner_entity_name"
                                  value={
                                    currentEditingPartnerInfo.patner_entity_name
                                  }
                                  onChange={handleEditPartner}
                                />
                              </>
                            ) : (
                              item.partner_entity_name
                            )}
                          </TableCell>
                          <TableCell style={{ color: '#FFF' }}>
                            {currentEditingPartner === item.id ? (
                              <>
                                <input
                                  type="text"
                                  id="partner_administrator_name"
                                  name="partner_administrator_name"
                                  value={
                                    currentEditingPartnerInfo.partner_administrator_name
                                  }
                                  onChange={handleEditPartner}
                                />
                              </>
                            ) : (
                              item.partner_administrator_name
                            )}
                          </TableCell>
                          <TableCell style={{ color: '#FFF' }}>
                            {currentEditingPartner === item.id ? (
                              <>
                                <input
                                  type="text"
                                  id="partner_address"
                                  name="partner_address"
                                  value={
                                    currentEditingPartnerInfo.partner_address
                                  }
                                  onChange={handleEditPartner}
                                />
                              </>
                            ) : (
                              item.partner_address
                            )}
                          </TableCell>
                          <TableCell style={{ color: '#FFF' }}>
                            {currentEditingPartner === item.id ? (
                              <>
                                <input
                                  type="text"
                                  id="partner_url"
                                  name="partner_url"
                                  value={currentEditingPartnerInfo.partner_url}
                                  onChange={handleEditPartner}
                                />
                              </>
                            ) : (
                              item.partner_url
                            )}
                          </TableCell>
                          <TableCell style={{ color: '#FFF' }}>
                            {currentEditingPartner === item.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    handleEditPartnerSubmit(
                                      currentEditingPartnerInfo,
                                      item.id,
                                    )
                                  }
                                >
                                  Save
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setCurrentEditingPartner(item.id);
                                    setCurrentEditingPartnerInfo({
                                      partner_name: item.partner_name,
                                      partner_description:
                                        item.partner_description,
                                      partner_url: item.partner_url,
                                      patner_entity_name:
                                        item.partner_entity_name,
                                      partner_administrator_name:
                                        item.partner_administrator_name,
                                      partner_address: item.partner_address,
                                    });
                                  }}
                                >
                                  Edit
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      </>
                    ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Drawer
          anchor="right"
          open={addingNewPartner}
          onClose={() => setAddingNewPartner(false)}
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
                      Partner Name
                    </label>
                    <input
                      id="partner_name"
                      style={{
                        background: 'rgb(1, 8, 28)',
                        borderColor: '#FFF',
                        color: '#FFF',
                      }}
                      type="text"
                      name="partner_name"
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label
                      style={{ color: '#FFF', marginBottom: '1rem' }}
                      contro="partner_description"
                    >
                      Partner Description
                    </label>
                    <input
                      id="partner_description"
                      style={{
                        background: 'rgb(1, 8, 28)',
                        borderColor: '#FFF',
                        color: '#FFF',
                      }}
                      type="text"
                      name="partner_description"
                      onChange={handleInputChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                      Partner Entity Name
                    </label>
                    <input
                      id="partner_entity_name"
                      style={{
                        background: 'rgb(1, 8, 28)',
                        borderColor: '#FFF',
                        color: '#FFF',
                      }}
                      type="text"
                      name="partner_entity_name"
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                      Partner Administrator Name
                    </label>
                    <input
                      id="partner_administrator_name"
                      style={{
                        background: 'rgb(1, 8, 28)',
                        borderColor: '#FFF',
                        color: '#FFF',
                      }}
                      type="text"
                      name="partner_administrator_name"
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                      Partner Address
                    </label>
                    <input
                      id="partner_address"
                      style={{
                        background: 'rgb(1, 8, 28)',
                        borderColor: '#FFF',
                        color: '#FFF',
                      }}
                      type="text"
                      name="partner_address"
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label style={{ color: '#FFF', marginBottom: '1rem' }}>
                      Partner URL
                    </label>
                    <input
                      id="partner_url"
                      style={{
                        background: 'rgb(1, 8, 28)',
                        borderColor: '#FFF',
                        color: '#FFF',
                      }}
                      type="text"
                      name="partner_url"
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
                      onClick={() => submitSaveNewPartner(partnerInfo)}
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

AddPartners.propTypes = {
  partners: PropTypes.object,
  getPartnersPage: PropTypes.func.isRequired,
  saveNewPartnerPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  partners: makeSelectAddPartners(),
  saveNewPartner: makeSelectSaveNewPartner(),
  updatePartner: makeSelectUpdatePartner(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPartnersPage: () => dispatch(getPartners()),
    saveNewPartnerPage: partner => dispatch(saveNewPartner(partner)),
    updatePartnerPage: (id, partner) => dispatch(updatePartner(id, partner)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddPartners);
