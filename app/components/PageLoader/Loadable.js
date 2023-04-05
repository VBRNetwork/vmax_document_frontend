/**
 *
 * Asynchronously loads the component for PageLoader
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
