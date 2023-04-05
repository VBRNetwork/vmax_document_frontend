import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Container,
  Segment,
  Button,
  Input,
  Dropdown,
  Form,
  Header,
} from 'semantic-ui-react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from 'containers/App/user/selectors';
import {
  makeSelectHumanResources,
  makeSelectSubmitHr,
  makeSelectHrRequests,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getHrData, submitHr, getHrRequests } from './actions';

const fileOptions = [
  {
    key: 'Medical Leave Certificate',
    text: 'Medical Leave Certificate',
    value: 'Medical Leave Certificate',
    icon: 'medkit',
  },
  {
    key: 'Salary Certificate',
    text: 'Salary Certificate',
    value: 'Salary Certificate',
    icon: 'money bill alternate outline',
  },
];

export function HumanResources({
  hrData,
  getHrDataPage,
  user,
  submitHrDataPage,
  hrSubmit,
  hrRequests,
  getHrRequestsPage,
}) {
  useInjectReducer({ key: 'humanResources', reducer });
  useInjectSaga({ key: 'humanResources', saga });

  const formatYmd = item =>
    item
      .toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('-');

  const [submitHrRequest, setSubmitHrRequest] = React.useState({
    hr_file_request_name: '',
    hr_file_request_date_created: formatYmd(new Date()),
    hr_file_type: fileOptions.value,
  });

  const [showHrFiles, setShowHrFiles] = React.useState(false);
  const [showHr, setShowHr] = React.useState('hr-files');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSubmitHrRequest(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (e, { name, value }) => {
    setSubmitHrRequest(prevValue => ({ ...prevValue, [name]: value }));
  };
  React.useEffect(() => {
    getHrDataPage();
  }, []);

  React.useEffect(() => {
    getHrRequestsPage();
  }, []);

  const submit = () => {
    submitHrDataPage(submitHrRequest);
  };

  return (
    <div>
      <Helmet>
        <title>HumanResources</title>
        <meta name="description" content="Description of HumanResources" />
      </Helmet>
      <Container style={{ padding: '5rem' }}>
        {/* <Button onClick={setShowHr('hr-files')}>
          {(showHr === 'hr-files' && 'HR Files') ||
            (showHr === 'hr-submit' && 'HR Submit') ||
            (showHr === 'hr-requests' && 'HR Requests')}
        </Button> */}

        {showHr === 'hr-files' ? (
          <>
            <Button onClick={() => setShowHr('hr-submit')}>HR Submit</Button>
            <Button onClick={() => setShowHr('hr-requests')}>
              HR Requests
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setShowHr('hr-requests')}>HR Files</Button>
          </>
        )}
        {showHr === 'hr-files' && (
          <>
            <Header as="h2">HR Files</Header>
            <>
              {!hrData.loading && !hrData.error && hrData.results.length > 0 && (
                <>
                  {hrData.results.map(item => (
                    <Segment key={item.id}>
                      <Header>{item.hr_file_name}</Header>
                      <p>{item.hr_file_date_created}</p>
                      <p>{item.hr_file_request_date_created}</p>
                    </Segment>
                  ))}
                </>
              )}
            </>
          </>
        )}
        {showHr === 'hr-submit' && (
          <>
            <Header style={{ fontSize: '30px', textAlign: 'center' }}>
              Submit HR Request
            </Header>
            <Segment style={{ padding: '5rem' }}>
              <Form>
                <Form.Field>
                  <label>Request Name</label>
                  <input
                    id="hr_file_request_name"
                    name="hr_file_request_name"
                    value={submitHrRequest.hr_file_request_name}
                    placeholder="First Name"
                    onChange={handleInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>File Type</label>
                  <Dropdown
                    placeholder="Select Friend"
                    fluid
                    selection
                    options={fileOptions}
                    id="hr_file_type"
                    name="hr_file_type"
                    value={submitHrRequest.hr_file_type}
                    onChange={handleDropdownChange}
                  />
                </Form.Field>

                <Button
                  onClick={submit}
                  type="submit"
                  loading={hrSubmit.loading}
                >
                  Submit
                </Button>
              </Form>
            </Segment>
          </>
        )}
        {showHr === 'hr-requests' && (
          <>
            <Header as="h2">HR Requests</Header>
          </>
        )}
        {/* <Button onClick={() => setShowHrFiles(!showHrFiles)}>
          {showHrFiles ? 'Submit HR Request' : 'Show HR Files'}
        </Button>
        {!showHrFiles ? (
          <>
            <Header style={{ fontSize: '30px', textAlign: 'center' }}>
              Submit HR Request
            </Header>
            <Segment style={{ padding: '5rem' }}>
              <Form>
                <Form.Field>
                  <label>Request Name</label>
                  <input
                    id="hr_file_request_name"
                    name="hr_file_request_name"
                    value={submitHrRequest.hr_file_request_name}
                    placeholder="First Name"
                    onChange={handleInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>File Type</label>
                  <Dropdown
                    placeholder="Select Friend"
                    fluid
                    selection
                    options={fileOptions}
                    id="hr_file_type"
                    name="hr_file_type"
                    value={submitHrRequest.hr_file_type}
                    onChange={handleDropdownChange}
                  />
                </Form.Field>

                <Button
                  onClick={submit}
                  type="submit"
                  loading={hrSubmit.loading}
                >
                  Submit
                </Button>
              </Form>
            </Segment>
          </>
        ) : (
          <>
            {!hrData.loading && !hrData.error && hrData.results.length > 0 && (
              <>
                {hrData.results.map(item => (
                  <Segment key={item.id}>
                    <Header>{item.hr_file_name}</Header>
                    <p>{item.hr_file_date_created}</p>
                    <p>{item.hr_file_request_date_created}</p>
                  </Segment>
                ))}
              </>
            )}
          </>
        )} */}
      </Container>
    </div>
  );
}

HumanResources.propTypes = {
  hrData: PropTypes.object,
  hrSubmit: PropTypes.object,
  hrRequests: PropTypes.object,
  user: PropTypes.object,
  getHrDataPage: PropTypes.func.isRequired,
  submitHrDataPage: PropTypes.func.isRequired,
  getHrRequestsPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hrData: makeSelectHumanResources(),
  user: makeSelectUser(),
  hrSubmit: makeSelectSubmitHr(),
  hrRequests: makeSelectHrRequests(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getHrDataPage: () => dispatch(getHrData()),
    getHrRequestsPage: () => dispatch(getHrRequests()),
    submitHrDataPage: data => dispatch(submitHr(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HumanResources);
