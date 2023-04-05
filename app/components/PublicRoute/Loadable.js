/**
 *
 * Asynchronously loads the component for PublicRoute
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
