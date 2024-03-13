/* eslint-disable jest/valid-expect */
/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { MongoClient } from 'mongodb';
import dbClient from '../../utils/db';

chai.use(chaiHttp);
const { expect } = chai;

describe('dBClient', function () {
  this.timeout(5000);
  let client;
  let db;

  before(async () => {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || 27017;
    const DATABASE = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${HOST}:${PORT}`;

    client = new MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    await client.connect();
    db = client.db(`${DATABASE}`);
  });

  after(async () => {
    await client.close();
  });

  it('should return true when the db connection is alive', async () => {
    const result = dbClient.isAlive();
    expect(result).to.be.true;
  });

  it('should return the number of users in the db', async () => {
    const usersCollection = db.collection('users');
    await usersCollection.deleteMany({});
    await usersCollection.insertMany([
      { name: 'kate kimani' },
      { name: 'evelyn lyn' },
    ]);

    const numUsers = await dbClient.nbUsers();
    expect(numUsers).to.equal(2);
  });

  it('should return the number of files in the database', async () => {
    const filesCollection = db.collection('files');
    await filesCollection.deleteMany({});
    await filesCollection.insertMany([
      { filename: 'fileOne.txt' },
      { filename: 'fileTwo.txt' },
    ]);

    const numFiles = await dbClient.nbFiles();
    expect(numFiles).to.equal(2);
  });
});
