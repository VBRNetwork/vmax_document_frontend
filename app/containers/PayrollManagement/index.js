import React, { memo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal } from 'semantic-ui-react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Button,
  Box,
  Stack,
  Paper,
  Collapse,
  IconButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from 'containers/App/user/selectors';
import makeSelectPayrollManagement from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getPayrollData } from './actions';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log('row', row.payroll_user.username);
  const [showPayrollFile, setShowPayrollFile] = React.useState(-1);

  const theModal = ({ installment }) => (
    <Modal
      id={installment.payroll.id}
      key={installment.payroll.id}
      open={showPayrollFile === installment.payroll.id}
      onClose={() => setShowPayrollFile(-1)}
      onOpen={() => setShowPayrollFile(installment.payroll.id)}
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
          {installment.payroll_name}
        </Button>
      }
    >
      <Modal.Content style={{ background: 'rgb(1, 8, 28)' }} scrolling>
        <Typography variant="h4" style={{ color: '#FFF', textAlign: 'center' }}>
          {installment.payroll_name} -{' '}
          <a href={installment.file} download target="_blank">
            Download
          </a>
        </Typography>

        <Modal.Description>
          <DocViewer
            documents={[
              {
                uri: installment.payroll_installments.map(
                  item => item.payroll_installment_file,
                ),
              },
            ]}
            pluginRenderers={DocViewerRenderers}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            style={{ color: '#FFF' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: '#FFF' }} component="th" scope="row">
          {row.payroll_name}
        </TableCell>
        <TableCell style={{ color: '#FFF' }}>
          {row.payroll_user.username}
        </TableCell>
        <TableCell style={{ color: '#FFF' }}>
          {row.payroll_salary_gross}
        </TableCell>
        <TableCell style={{ color: '#FFF' }}>
          {row.payroll_salary_net}
        </TableCell>
        <TableCell style={{ color: '#FFF' }}>
          {row.payroll_user.tenure}
        </TableCell>
        <TableCell style={{ color: '#FFF' }}>{row.payroll_user.role}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                style={{ color: '#FFF' }}
                variant="h6"
                gutterBottom
                component="div"
              >
                Payroll Installments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: '#FFF' }}>
                      Installment Name
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }}>
                      Installment Date
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }}>
                      Installment Amount Gross
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }}>
                      Installment Amount Net
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }}>
                      Installment Amount Tax
                    </TableCell>
                    <TableCell style={{ color: '#FFF' }}>
                      Installment Amount File
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.payroll_installments.map(installment => (
                    <TableRow key={installment.id}>
                      <TableCell
                        style={{ color: '#FFF' }}
                        component="th"
                        scope="row"
                      >
                        {installment.payroll_installment_name}
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }}>
                        {installment.payroll_installment_date}
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }}>
                        {installment.payroll_installment_amount_gross}
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }}>
                        {installment.payroll_installment_amount_net}
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }}>
                        {installment.payroll_installment_amount_tax}
                      </TableCell>
                      <TableCell style={{ color: '#FFF' }}>
                        {/* {theModal(installment)}s */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
  installment: PropTypes.shape({
    payroll_installment_amount_gross: PropTypes.number.isRequired,
    payroll_installment_amount_net: PropTypes.number.isRequired,
    payroll_installment_amount_tax: PropTypes.number.isRequired,
    payroll_installment_date: PropTypes.string.isRequired,
    payroll_installment_file: PropTypes.string.isRequired,
    payroll_installment_name: PropTypes.string.isRequired,
  }).isRequired,
};

export function PayrollManagement({ payroll, getPayrollPage, user }) {
  useInjectReducer({ key: 'payrollManagement', reducer });
  useInjectSaga({ key: 'payrollManagement', saga });

  React.useEffect(() => {
    getPayrollPage();
  }, []);

  return (
    <div>
      <Helmet>
        <title>PayrollManagement</title>
        <meta name="description" content="Description of PayrollManagement" />
      </Helmet>
      <Container style={{ paddingTop: '10rem' }} maxWidth="xxl">
        <Box style={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            style={{ fontWeight: '400', color: 'rgb(31, 154, 183)' }}
          >
            Payroll Management
          </Typography>
          <Typography
            style={{
              color: 'rgb(29, 114, 106)',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
            variant="body1"
            component="p"
          >
            {user.user.username && user.user.username.toUpperCase()}
            {' - '}
            {user.user.is_superuser ? 'Admin' : 'User'}
          </Typography>
        </Box>
        <Box
          style={{
            boxShadow: 'rgb(29, 114, 106) 0px 15px 30px 0px',
            borderRadius: '20px',
            padding: '5rem',
          }}
        >
          <TableContainer style={{ background: '#01081c' }} component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell style={{ color: '#FFF' }}>Payroll Name</TableCell>
                  <TableCell style={{ color: '#FFF' }}>Payroll User</TableCell>
                  <TableCell style={{ color: '#FFF' }}>Salary Gross</TableCell>
                  <TableCell style={{ color: '#FFF' }}>Salary Net</TableCell>
                  <TableCell style={{ color: '#FFF' }}>User Tenure</TableCell>
                  <TableCell style={{ color: '#FFF' }}>User Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payroll.results.map(row => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}

PayrollManagement.propTypes = {
  payroll: PropTypes.object.isRequired,
  getPayrollPage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  payroll: makeSelectPayrollManagement(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPayrollPage: () => dispatch(getPayrollData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PayrollManagement);
