import Queue from 'bull';
import { promises as fs } from 'fs';
import { ObjectID } from 'mongodb';
import imageThumbnail from 'image-thumbnail';
import dbClient from './utils/db';

const fileQueue = new Queue('fileQueue', 'redis://127.0.0.1:6379');
const userQueue = new Queue('userQueue', 'redis://127.0.0.1:6379');

async function thumbnail(width, localPath) {
  const thumbnail = await imageThumbnail(localPath, { width });
  return thumbnail;
}

fileQueue.process(async (job, done) => {
  console.log('Processing...');
  const { fileId } = job.data;
  if (!fileId) {
    done(new Error('Missing field'));
  }
  const { userId } = job.data;
  if (!userId) {
    done(new Error('Missing userId'));
  }
  console.log(fileId, userId);
  const files = dbClient.db.collection('files');
  const idObj = new ObjectID(fileId);
  files.findOne({ _id: idObj }, async (err, file) => {
    if (!file) {
      console.log('Not found');
      done(new Error('File not found'));
    } else {
      const fileName = file.localPath;
      const thumbnail500 = await thumbnail(500, fileName);
      const thumbnail250 = await thumbnail(250, fileName);
      const thumbnail100 = await thumbnail(100, fileName);

      console.log('Writing files to system');

      const image500 = `${file.localPath}_500`;
      const image250 = `${file.localPath}_250`;
      const image100 = `${file.localPath}_100`;

      await fs.writeFile(image500, thumbnail500);
      await fs.writeFile(image250, thumbnail250);
      await fs.writeFile(image100, thumbnail100);
      done();
    }
  });
});

userQueue.process(async (job, done) => {
  const { userId } = job.data;

  if (!userId) done(new Error('Missing userId'));

  const users = dbClient.db.collection('users');
  const idObject = new ObjectID(userId);
  const user = await users.findOne({ _id: idObject });

  if (user) {
    console.log(`Welcome ${user.email}!`);
  } else {
    done(new Error('User not found'));
  }
});