import useDatabase from './useDatabase';
import useSession from './useSession';

const middleware = handler => useDatabase(useSession(handler));

export default middleware;
