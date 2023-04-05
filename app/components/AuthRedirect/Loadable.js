/**
 *
 * Asynchronously loads the component for AuthRedirect
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
