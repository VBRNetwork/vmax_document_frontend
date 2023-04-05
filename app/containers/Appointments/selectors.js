import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppointmentsDomain = state => state.appointments || initialState;

const makeSelectAppointments = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => substate.calendar,
  );
const makeSelectUpdateCalendar = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => substate.updateCalendar,
  );

export default makeSelectAppointments;
export {
  selectAppointmentsDomain,
  makeSelectAppointments,
  makeSelectUpdateCalendar,
};
