import session, { withSession } from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

// console.log('useSession.MongoStore:::', MongoStore);

const useSession = handler =>
  withSession(handler, {
    store: new MongoStore({
      url: 'mongodb://127.0.0.1:27017/test'
    })
  });

console.log('useSession.useSession:::');

export default useSession;
