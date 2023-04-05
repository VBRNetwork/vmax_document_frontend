/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Input,
  Segment,
  Form,
  Header,
  Dropdown,
  Image,
} from 'semantic-ui-react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectHomePage } from 'containers/HomePage/selectors';
import {
  makeSelectAddContract,
  makeSelectGetPartners,
  makeSelectSubmitDocument,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { submitDocument, getPartners } from './actions';

export function AddContract({
  submitContractPage,
  partners,
  getPartnersPage,
  contracts,
  submitDocuments,
  submitDocumentPage,
}) {
  useInjectReducer({ key: 'addContract', reducer });
  useInjectSaga({ key: 'addContract', saga });

  const documentOptions = [
    {
      key: 'Contract',
      text: 'Contract',
      value: 'Contract',
    },
    {
      key: 'Bank Statement',
      text: 'Bank Statement',
      value: 'Bank Statement',
    },
    {
      key: 'Invoice',
      text: 'Invoice',
      value: 'Invoice',
    },
  ];

  const [fileValue, setFileValue] = React.useState([]);
  const [documentInfo, setDocumentInfo] = React.useState({
    document_description: '',
    document_type: '',
    partner: '',
  });

  const handleSubmitDocument = () => {
    console.log('SLOBOZESCU_MI_AI', documentInfo);
    submitDocumentPage(fileValue, documentInfo);
  };

  const fileHandler = e => {
    // eslint-disable-next-line prefer-const
    let fileObj = e.target.files[0];
    setFileValue(prevState => [...prevState, fileObj]);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setDocumentInfo(prevState => ({ ...prevState, [name]: value }));
    console.log('SLOBOZ1', value);
  };

  const handleDropdownChange = (e, { name, value }) => {
    setDocumentInfo(prevValue => ({ ...prevValue, [name]: value }));
    console.log('SLOBOZ2', value);
  };
  const handleDropdownDocument = (e, { name, value }) => {
    setDocumentInfo(prevValue => ({ ...prevValue, [name]: value }));
    console.log('SLOBOZ3', value);
  };

  React.useEffect(() => {
    getPartnersPage();
  }, []);

  const SelectPartner = () => (
    <>
      <Dropdown
        placeholder="Select a Partner"
        fluid
        selection
        name="partner"
        id="partner"
        value={documentInfo.partner}
        style={{
          background: 'rgb(1, 8, 28)',
          borderColor: '#FFF',
          color: '#FFF',
        }}
        onChange={handleDropdownChange}
        options={
          !partners.loading &&
          !partners.error &&
          partners.results.map(item => ({
            key: item.id,
            text: item.partner_name,
            value: item.partner_name,
            // image: <Image size="tiny" src={item.partner_logo} />,
          }))
        }
      />
    </>
  );

  const DocumentType = () => (
    <>
      <Dropdown
        placeholder="Select Document Type"
        fluid
        selection
        value={documentInfo.document_type}
        name="document_type"
        id="document_type"
        style={{
          background: 'rgb(1, 8, 28)',
          borderColor: '#FFF',
          color: '#FFF',
        }}
        onChange={handleDropdownDocument}
        options={documentOptions}
      />
    </>
  );

  return (
    <div style={{ background: 'rgb(1, 8, 28)' }}>
      <Helmet>
        <title>AddContract</title>
        <meta name="description" content="Description of AddContract" />
      </Helmet>
      <Container style={{ paddingTop: '100px', background: 'rgb(1, 8, 28)' }}>
        <Paper
          style={{
            borderRadius: '50px',
            padding: '3rem',
            background: 'rgb(1, 8, 28)',
          }}
        >
          <Header
            as="h1"
            style={{
              fontSize: '38px',
              textAlign: 'center',
              color: 'rgb(29, 114, 106) ',
            }}
          >
            Add New Document
          </Header>
          <Form style={{ padding: '5rem' }}>
            <Form.Field>
              <label style={{ color: '#FFF' }}>Document Description</label>
              <input
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                name="document_description"
                id="document_description"
                value={documentInfo.document_description}
                placeholder="Document Description"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF' }}>Document Type</label>
              <DocumentType />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF' }}>Partner</label>
              <SelectPartner />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFF' }}>Document File</label>
              <input
                style={{
                  background: 'rgb(1, 8, 28)',
                  borderColor: '#FFF',
                  color: '#FFF',
                }}
                type="file"
                onChange={fileHandler}
              />
            </Form.Field>
            <Form.Field style={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                style={{
                  backgroundColor: 'rgb(1, 8, 28)',
                  color: 'rgb(29, 114, 106)',
                  border: '1px solid rgb(29, 114, 106) ',
                  marginTop: '10px',
                  width: '150px',
                  height: '50px',
                }}
                onClick={() => handleSubmitDocument(fileValue, documentInfo)}
              >
                Save Document
              </Button>
            </Form.Field>
          </Form>
        </Paper>
      </Container>
    </div>
  );
}

AddContract.propTypes = {
  submitContractPage: PropTypes.func.isRequired,
  getPartnersPage: PropTypes.func.isRequired,
  partners: PropTypes.object,
  contracts: PropTypes.object,
  submitDocuments: PropTypes.object,
  submitDocumentPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addContract: makeSelectAddContract(),
  partners: makeSelectGetPartners(),
  contracts: makeSelectHomePage(),
  submitDocuments: makeSelectSubmitDocument(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitDocumentPage: (file, info) => dispatch(submitDocument(file, info)),
    getPartnersPage: () => dispatch(getPartners()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddContract);
