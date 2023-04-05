/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Appointments
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Segment, Header, Grid, Button, Form } from 'semantic-ui-react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getCalendar, updateCalendar } from './actions';

export function Appointments({
  calendar,
  getCalendarPage,
  updateCalendarPage,
}) {
  useInjectReducer({ key: 'appointments', reducer });
  useInjectSaga({ key: 'appointments', saga });

  const localizer = momentLocalizer(moment);
  const date = new Date();

  const bookings = [
    {
      start: new Date(),
      end: date.setDate(date.getDate() + 3),
      title: `Ola Stay (Human:)`,
    },
  ];

  const [appointment, setAppointment] = React.useState({
    start: new Date(),
    end: date.setDate(date.getDate() + 3),
    title: `Ola Stay (Human:)`,
  });

  const [calendarView, setCalendarView] = React.useState(false);

  React.useEffect(() => {
    getCalendarPage();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Appointments</title>
        <meta name="description" content="Description of Appointments" />
      </Helmet>
      <Segment style={{ padding: '3rem' }}>
        {!calendarView && (
          <>
            <Button
              style={{ marginBottom: '5%' }}
              onClick={() => setCalendarView(true)}
            >
              Submit Appointment
            </Button>
            <Calendar
              onSelectEvent={e => {
                console.log(e);
              }}
              onSelecting={() => alert(312321)}
              localizer={localizer}
              events={bookings}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </>
        )}
        {calendarView && (
          <>
            <Button
              style={{ marginBottom: '5%' }}
              onClick={() => setCalendarView(false)}
            >
              Back
            </Button>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <>
                    <Segment>
                      <Form>
                        <Form.Field>
                          <label>Appointment Title</label>
                          <input placeholder="Appointment Title" />
                        </Form.Field>
                        <Form.Field>
                          <label>Appointment Description</label>
                          <input placeholder="Appointment Description" />
                        </Form.Field>
                        <Form.Field>
                          <label>Appointment Start Time</label>
                          <Datetime input={false} />
                        </Form.Field>
                        <Form.Field>
                          <label>Appointment End Time</label>
                          <Datetime input={false} />
                        </Form.Field>

                        <Button type="submit">Submit</Button>
                      </Form>
                    </Segment>
                  </>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Calendar
                    onSelectEvent={e => {
                      console.log(e);
                    }}
                    onSelecting={() => alert(312321)}
                    localizer={localizer}
                    events={bookings}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>
        )}
      </Segment>
    </div>
  );
}

Appointments.propTypes = {
  calendar: PropTypes.object,
  getCalendarPage: PropTypes.func,
  updateCalendarPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  calendar: makeSelectAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCalendarPage: () => dispatch(getCalendar()),
    updateCalendarPage: data => dispatch(updateCalendar(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Appointments);
