import { ObjectId } from 'mongodb';

const useAuthentication = handler => (req, res) => {
  console.log('useAuthentication.req1:::', req.body);
  console.log('useAuthentication.res1:::', res.statusCode);
  if (req.session.userId) {
    console.log(req.session.userId);
    return req.db
      .collection('users')
      .findOne(ObjectId(req.session.userId))
      .then(user => {
        console.log(user);
        if (user) req.user = user;
        return handler(req, res);
      });
  }
  console.log('useAuthentication.req2:::', req.body);
  console.log('useAuthentication.res2:::', res.statusCode);
  return handler(req, res);
};

export default useAuthentication;
