import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/test';

// const client = new MongoClient(process.env.MONGODB_URI, {
const client = new MongoClient('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true
});

const useDatabase = handler => (req, res) => {
  console.log('useDB.req1:::', req.body);
  console.log('useDB.res1:::', res.statusCode);
  if (!client.isConnected()) {
    return client.connect().then(() => {
      req.db = client.db('test');
      return handler(req, res);
    });
  }
  req.db = client.db('test');
  console.log('useDB.req2:::', req.body);
  console.log('useDB.res2:::', res.statusCode);
  return handler(req, res);
};
export default useDatabase;
