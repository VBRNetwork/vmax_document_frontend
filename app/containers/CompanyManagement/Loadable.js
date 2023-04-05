/**
 *
 * Asynchronously loads the component for CompanyManagement
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
