/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header, Dropdown, Form, Modal } from 'semantic-ui-react';

import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table as NewTable,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Backdrop,
  CircularProgress,
  Drawer,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import FileViewer from 'react-file-viewer';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import SignatureCanvas from 'react-signature-canvas';
import CloseIcon from '@mui/icons-material/Close';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from 'containers/App/user/selectors';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import {
  makeSelectHomePage,
  makeSelectDocuments,
  makeSelectGetPartners,
  makeSelectSubmitDocument,
  makeSelectDocumentsRomexpo,
  makeSelectDocumentsCluj,
  makeSelectDocumentsTitan,
  makeSelectCompanyLocations,
} from './selectors';
import saga from './saga';
import reducer from './reducer';
import {
  getDocuments,
  submitSignature,
  getPartners,
  submitDocument,
  getDocumentsRomexpo,
  getDocumentsCluj,
  getDocumentsTitan,
  getCompanyLocations,
} from './actions';
import './home.css';

export function HomePage({
  getDocumentsPage,
  documents,
  submitDigitalSignature,
  partners,
  submitDocumentPage,
  getPartnersPage,
  locations,
  getLocationsPage,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const { useCallback } = React;

  React.useEffect(() => {
    getDocumentsPage();
    getLocationsPage();
  }, []);

  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [showDocument, setShowDocument] = React.useState(-1);
  const [signatureBegin, setSignatureBegin] = React.useState(false);
  const [isSignatureDone, setIsSignatureDone] = React.useState(false);
  const [imageURL, setImageURL] = React.useState(null);
  const [isSignatureSubmitted, setIsSignatureSubmmited] = React.useState(false);
  const [addingNewDocument, setAddingNewDocument] = React.useState(false);
  const [filterContractChecked, setFilterContractChecked] = React.useState(
    false,
  );
  const [filterPreContract, setFilterPreContract] = React.useState(false);
  const [filterSupplierInvoice, setFilterSupplierInvoice] = React.useState(
    false,
  );
  const [filterVBRInvoice, setFilterVBRInvoice] = React.useState(false);
  const [filterNDA, setFilterNDA] = React.useState(false);
  const [filterOther, setFilterOther] = React.useState(false);
  const [filterEmailDocs, setFilterEmailDocs] = React.useState(false);
  const [fileterRomexpo, setFilterRomexpo] = React.useState(false);
  const [filterCluj, setFilterCluj] = React.useState(false);
  const [filterTitan, setFilterTitan] = React.useState(false);
  const [filterIasi, setFilterIasi] = React.useState(false);
  const { instance } = useMsal();

  const handleLogin = loginType => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch(e => {
        console.log(e);
      });
    }
  };

  const sigCanvas = React.useRef({});

  const clear = () => sigCanvas.current.clear();
  const save = () =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  console.log('imageURL', imageURL);
  console.log('sigCanvas', sigCanvas);

  const submitSig = contract => {
    submitDigitalSignature(imageURL, contract.contract_id);
  };

  function onDocumentLoadSuccess() {
    setNumPages(numPages);
  }

  const documentOptions = [
    {
      key: 'Contract',
      text: 'Contract',
      value: 'Contract',
    },
    {
      key: 'Pre-Contract',
      text: 'Pre-Contract',
      value: 'Pre-Contract',
    },
    {
      key: 'Supplier Invoice',
      text: 'Supplier Invoice',
      value: 'Supplier Invoice',
    },
    {
      key: 'VBR Invoice',
      text: 'VBR Invoice',
      value: 'VBR Invoice',
    },
    {
      key: 'NDA',
      text: 'NDA',
      value: 'NDA',
    },
    {
      key: 'Document',
      text: 'Document',
      value: 'Document',
    },
    {
      key: 'Other',
      text: 'Other',
      value: 'Other',
    },
  ];

  const [fileValue, setFileValue] = React.useState([]);
  const [documentInfo, setDocumentInfo] = React.useState({
    document_description: '',
    document_type: '',
    partner: '',
    location: '',
  });
  const [readExcel, setReadExcel] = React.useState({
    cols: [],
    rows: [],
  });

  const handleSubmitDocument = () => {
    submitDocumentPage(fileValue, documentInfo);
  };

  const fileHandler = e => {
    // eslint-disable-next-line prefer-const
    let fileObj = e.target.files[0];
    setFileValue(prevState => [...prevState, fileObj]);
  };

  // const excelReader = document => {
  //   ExcelRenderer(document, (err, resp) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       setReadExcel({
  //         cols: resp.cols,
  //         rows: resp.rows,
  //       });
  //     }
  //   });
  // };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setDocumentInfo(prevState => ({ ...prevState, [name]: value }));
  };
  const handleDropdownChange = (e, { name, value }) => {
    setDocumentInfo(prevValue => ({ ...prevValue, [name]: value }));
  };
  const handleDropdownDocument = (e, { name, value }) => {
    setDocumentInfo(prevValue => ({ ...prevValue, [name]: value }));
  };

  const handleFilterContractChecked = () => {
    setFilterContractChecked(prevState => !prevState);
  };

  const handleFilterPreContract = () => {
    setFilterPreContract(prevState => !prevState);
  };

  const handleFilterSupplierInvoice = () => {
    setFilterSupplierInvoice(prevState => !prevState);
  };

  const handleFilterVBRInvoice = () => {
    setFilterVBRInvoice(prevState => !prevState);
  };

  const handleFilterNDA = () => {
    setFilterNDA(prevState => !prevState);
  };

  const handleFilterOther = () => {
    setFilterOther(prevState => !prevState);
  };

  const handleFilterEmailDocs = () => {
    setFilterEmailDocs(prevState => !prevState);
  };

  const handleFilterRomexpo = () => {
    setFilterRomexpo(prevState => !prevState);
  };

  const handleFilterCluj = () => {
    setFilterCluj(prevState => !prevState);
  };

  const handleFilterTitan = () => {
    setFilterTitan(prevState => !prevState);
  };

  const handleFilterIasi = () => {
    setFilterIasi(prevState => !prevState);
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
          background: 'rgb(21, 22, 25)',
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

  const SelectLocation = () => (
    <>
      <Dropdown
        placeholder="Select a Location"
        fluid
        selection
        name="location"
        id="location"
        value={documentInfo.location}
        style={{
          background: 'rgb(21, 22, 25)',
          borderColor: '#FFF',
          color: '#FFF',
        }}
        onChange={handleDropdownChange}
        options={
          !locations.loading &&
          !locations.error &&
          locations.results.map(item => ({
            key: item.id,
            text: item.location_name,
            value: item.location_name,
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
          background: 'rgb(21, 22, 25)',
          borderColor: '#FFF',
          color: '#FFF',
        }}
        onChange={handleDropdownDocument}
        options={documentOptions}
      />
    </>
  );

  const documentUploader = document => {
    if (document.document_uploader === null) {
      return <p>{document.document_email_uploader}</p>;
    }
    return (
      <p>
        {document.document_uploader.first_name}{' '}
        {document.document_uploader.last_name}
      </p>
    );
  };

  const theModal = document => (
    <Modal
      id={document.document_id}
      key={document.document_id}
      open={showDocument === document.document_id}
      onClose={() => setShowDocument(-1)}
      onOpen={() => setShowDocument(document.document_id)}
      style={{ marginLeft: '35rem', }}
      trigger={
        <Button
          variant="outlined"
          style={{
            fontWeight: '400',
            color: 'rgb(29, 114, 106)',
            cursor: 'pointer',
            fontSize: '1.2rem',
            border: '1px solid rgb(29, 114, 106)',
            borderRadius: '20px',
            
          }}
        >
          {document.document_name}
        </Button>
      }
    >
      <Modal.Content style={{ background: 'rgb(1, 8, 28)',  maxHeight: 'none' }} scrolling>
        <Button
          style={{
            marginLeft: '55rem',
            color: 'red',
          }}
          onClick={() => setShowDocument(-1)}
        >
          <CloseIcon style={{ fontSize: '2.5rem' }} />
        </Button>

        <Typography variant="h4" style={{ color: '#FFF', textAlign: 'center' }}>
          {document.document_name} -{' '}
          <a href={document.file} download target="_blank">
            Download
          </a>
        </Typography>
        <Modal.Description>
          {document.document_extension.toLowerCase() === 'pdf' && (
            <>
              <DocViewer
                documents={[{ uri: document.file }]}
                pluginRenderers={DocViewerRenderers}
                fileType={document.document_extension.toLowerCase()}
              />
            </>
          )}
          {document.document_extension.toLowerCase() === 'docx' && (
            <>
              <FileViewer
                fileType={document.document_extension.toLowerCase()}
                filePath={document.file}
              />
            </>
          )}
          {document.document_extension.toLowerCase() === 'xlsx' && <></>}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

  if (documents.loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const filterDocumentsBasedOnFilters = document => {
    if (
      (filterContractChecked && document.document_type === 'Contract') ||
      (filterPreContract && document.document_type === 'Pre-Contract') ||
      (filterSupplierInvoice &&
        document.document_type === 'Supplier Invoice') ||
      (filterVBRInvoice && document.document_type === 'VBR Invoice') ||
      (filterNDA && document.document_type === 'NDA') ||
      (filterOther && document.document_type === 'Other') ||
      (filterEmailDocs && document.document_has_attachment === true) ||
      (fileterRomexpo &&
        document.location &&
        document.location.location_name === 'Romexpo') ||
      (filterCluj &&
        document.location &&
        document.location.location_name === 'Cluj') ||
      (filterTitan &&
        document.location &&
        document.location.location_name === 'Titan') ||
      (filterIasi &&
        document.location &&
        document.location.location_name === 'Iasi')
    ) {
      return true;
    }
    if (
      !filterContractChecked &&
      !filterPreContract &&
      !filterSupplierInvoice &&
      !filterVBRInvoice &&
      !filterNDA &&
      !filterOther &&
      !filterEmailDocs &&
      !fileterRomexpo &&
      !filterCluj &&
      !filterTitan &&
      !filterIasi
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Box style={{ background: 'rgb(1, 8, 28)' }}>
        <>
          <Container
            maxWidth="false"
            style={
              documents.results.length < 6
                ? {
                    height: '80vh',
                    marginTop: '7rem',
                    background: 'rgb(1, 8, 28)',
                    minHeight: '80vh',
                }
                : {
                    marginTop: '7rem',
                    background: 'rgb(1, 8, 28)',
                    marginBottom: '2rem',
                    minHeight: '80vh',
                }
            }
          >
            <Typography
              style={{
                color: 'rgb(31, 154, 183)',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
              variant="h2"
              component="h1"
            >
              VBR Labs Document Manager
            </Typography>
            <Typography
              style={{
                color: 'rgb(29, 114, 106)',
                marginBottom: '5%',
                textAlign: 'center',
                fontSize: '1.5rem',
              }}
              variant="body1"
            >
              Total Documents: {documents.results.length}
            </Typography>
            <Box
              style={{
                boxShadow: 'rgb(29, 114, 106) 0px 15px 30px 0px',
                borderRadius: '50px',
                padding: '3rem',
              }}
            >
              <Box style={{ marginBottom: '2rem' }}>
                <Stack direction="row" spacing={10}>
                  <Button
                    variant="outlined"
                    onClick={() => setAddingNewDocument(true)}
                    style={{
                      borderColor: 'rgb(31, 154, 183)',
                      color: 'rgb(31, 154, 183)',
                      height: '4rem',
                    }}
                  >
                    Add New Document
                  </Button>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" spacing={10}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={fileterRomexpo}
                        onChange={handleFilterRomexpo}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Romexpo
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterCluj}
                        onChange={handleFilterCluj}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Cluj
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterTitan}
                        onChange={handleFilterTitan}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Titan
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterIasi}
                        onChange={handleFilterIasi}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Iasi
                      </Typography>
                    }
                  />
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" spacing={10}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterContractChecked}
                        onChange={handleFilterContractChecked}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Contracts
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterPreContract}
                        onChange={handleFilterPreContract}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Pre-Contracts
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterSupplierInvoice}
                        onChange={handleFilterSupplierInvoice}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Supplier Invoices
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterVBRInvoice}
                        onChange={handleFilterVBRInvoice}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter VBR Invoices
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterNDA}
                        onChange={handleFilterNDA}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter NDAs
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterOther}
                        onChange={handleFilterOther}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Other
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#FFF' }}
                        checked={filterEmailDocs}
                        onChange={handleFilterEmailDocs}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: 'rgb(31, 154, 183)',
                          fontWeight: '700',
                        }}
                      >
                        Filter Email Docs
                      </Typography>
                    }
                  />
                </Stack>
              </Box>
              <TableContainer
                style={{ background: 'rgb(1, 8, 28)' }}
                component={Paper}
              >
                <NewTable
                  sx={{ minWidth: 650 }}
                  size="big"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: '#FFF', fontSize: '1rem' }}>
                        Document ID
                      </TableCell>
                      <TableCell style={{ color: '#FFF', fontSize: '1rem' }}>
                        Document Partner
                      </TableCell>
                      <TableCell style={{ color: '#FFF', fontSize: '1rem' }}>
                        Document Name
                      </TableCell>
                      <TableCell style={{ color: '#FFF', fontSize: '1rem' }}>
                        Document Created At
                      </TableCell>
                      <TableCell style={{ color: '#FFF', fontSize: '1rem' }}>
                        Document Updated At
                      </TableCell>
                      <TableCell style={{ color: '#FFF', fontSize: '1rem' }}>
                        Document Uploader
                      </TableCell>
                      <TableCell style={{ color: '#FFF', fontSize: '1rem' }}>
                        View Document
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents.results
                      .filter(filterDocumentsBasedOnFilters)
                      .map(document => (
                        <>
                          <TableRow
                            id={document.id}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell
                              style={{ color: '#FFF' }}
                              component="th"
                              scope="row"
                            >
                              {document.document_id}
                            </TableCell>
                            <TableCell style={{ color: '#FFF' }}>
                              {document.partner === null ? (
                                <>
                                  <Typography
                                    style={{
                                      fontWeight: '400',
                                      color: 'red',
                                    }}
                                  >
                                    No Partner
                                  </Typography>
                                </>
                              ) : (
                                <>{document.partner}</>
                              )}
                            </TableCell>
                            <TableCell style={{ color: '#FFF' }}>
                              {document.document_name}
                            </TableCell>
                            <TableCell style={{ color: '#FFF' }}>
                              {document.document_created_at}
                            </TableCell>
                            <TableCell style={{ color: '#FFF' }}>
                              {document.document_updated_at}
                            </TableCell>
                            <TableCell style={{ color: '#FFF' }}>
                              {documentUploader(document)}
                            </TableCell>
                            <TableCell>{theModal(document)}</TableCell>
                          </TableRow>
                        </>
                      ))}
                  </TableBody>
                </NewTable>
              </TableContainer>
            </Box>
          </Container>
        </>
        <Drawer
          anchor="right"
          open={addingNewDocument}
          onClose={() => setAddingNewDocument(false)}
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
                  paddingTop: '13rem',
                  paddingBottom: '14rem',
                  background: 'rgb(21, 22, 25)',
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
                    <label style={{ color: '#FFF' }}>
                      Document Description
                    </label>
                    <input
                      style={{
                        background: 'rgb(21, 22, 25)',
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
                    <label style={{ color: '#FFF' }}>Location</label>
                    <SelectLocation />
                  </Form.Field>
                  <Form.Field>
                    <label style={{ color: '#FFF' }}>Document File</label>
                    <input
                      style={{
                        background: 'rgb(21, 22, 25)',
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
                        backgroundColor: 'rgb(21, 22, 25)',
                        color: 'rgb(29, 114, 106)',
                        border: '1px solid rgb(29, 114, 106) ',
                        marginTop: '10px',
                        width: '150px',
                        height: '50px',
                      }}
                      onClick={() =>
                        handleSubmitDocument(fileValue, documentInfo)
                      }
                    >
                      Save Document
                    </Button>
                  </Form.Field>
                </Form>
              </Container>
            </>
          }
        </Drawer>
      </Box>
    </>
  );
}

HomePage.propTypes = {
  documents: PropTypes.object,
  getDocumentsPage: PropTypes.func,
  user: PropTypes.shape({
    loading: PropTypes.bool,
    token: PropTypes.any,
    user: PropTypes.object,
  }),
  submitDigitalSignature: PropTypes.func,
  partners: PropTypes.object,
  getPartnersPage: PropTypes.func,
  submitDocumentPage: PropTypes.func,
  getDocumentsRomexpoPage: PropTypes.func,
  getDocumentsClujPage: PropTypes.func,
  getDocumentsTitanPage: PropTypes.func,
  documentsRomexpo: PropTypes.object,
  documentsCluj: PropTypes.object,
  documentsTitan: PropTypes.object,
  locations: PropTypes.object,
  getLocationsPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  contracts: makeSelectHomePage(),
  documents: makeSelectDocuments(),
  user: makeSelectUser(),
  partners: makeSelectGetPartners(),
  submitDocument: makeSelectSubmitDocument(),
  documentsRomexpo: makeSelectDocumentsRomexpo(),
  documentsCluj: makeSelectDocumentsCluj(),
  documentsTitan: makeSelectDocumentsTitan(),
  locations: makeSelectCompanyLocations(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDocumentsPage: () => dispatch(getDocuments()),
    getPartnersPage: () => dispatch(getPartners()),
    getDocumentsRomexpoPage: () => dispatch(getDocumentsRomexpo()),
    getDocumentsClujPage: () => dispatch(getDocumentsCluj()),
    getDocumentsTitanPage: () => dispatch(getDocumentsTitan()),
    submitDocumentPage: (file, info) => dispatch(submitDocument(file, info)),
    submitDigitalSignature: (signature, id) =>
      dispatch(submitSignature(signature, id)),
    getLocationsPage: () => dispatch(getCompanyLocations()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
