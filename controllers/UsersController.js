import ObjectId from 'mongodb';
import hashPasswd from '../utils/hashpwd';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const search = await dbClient.db.collection('users').find({ email }).toArray();
    if (search.length > 0) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashpwd = hashPasswd(password);
    const addUser = await dbClient.db.collection('users').insertOne({ email, password: hashpwd });
    const newUser = { id: addUser.ops[0]._id, email: addUser.ops[0].email };
    return res.status(201).json(newUser);
  }

  static async getMe(req, res) {
    const key = req.header('X-Token');
    const session = await redisClient.get(`auth_${key}`);
    if (!key || key.length === 0) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (session) {
      const search = await dbClient.db.collection('users').find({ _id: ObjectId(session) }).toArray();
      if (search.length > 0) {
        return res.status(200).json({ id: search[0]._id, email: search[0].email });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = UsersController;
