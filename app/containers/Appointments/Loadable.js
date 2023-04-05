/**
 *
 * Asynchronously loads the component for Appointments
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
