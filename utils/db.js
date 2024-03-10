const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost';
    const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017;
    this.database = (process.env.DB_DATABSE) ? process.env.DB_DATABSE : 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((err) => console.log(err.message));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const numUsers = await users.countDocuments();
    return numUsers;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const numFiles = await files.countDocuments();
    return numFiles;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
