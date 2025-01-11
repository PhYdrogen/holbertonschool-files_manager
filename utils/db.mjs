import pkg from 'mongodb';

const { MongoClient } = pkg;

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.database);
      console.log('Connected to MongoDB');
      return true;
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      return false;
    }
  }

  async isAlive() {
    if (this.db === null) {
      const connectionSuccess = await this.connect();
      if (!connectionSuccess) {
        return false;
      }
    }

    try {
      await this.db.command({ ping: 1 });
      return true;
    } catch (error) {
      console.error('Error pinging MongoDB:', error);
      return false;
    }
  }

  async nbUsers() {
    if (this.db === null) {
      const connectionSuccess = await this.connect();
      if (!connectionSuccess) return 0;
    }

    try {
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (err) {
      console.error('Failed to get user count:', err);
      return 0;
    }
  }

  async nbFiles() {
    if (this.db === null) {
      const connectionSuccess = await this.connect();
      if (!connectionSuccess) return 0;
    }

    try {
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (err) {
      console.error('Failed to get file count:', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
