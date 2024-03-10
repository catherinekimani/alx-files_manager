import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      response.json({ redis: true, db: true });
      response.end();
    }
  }

  static async getStats(request, response) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    response.json({ numUsers, numFiles });
    response.end();
  }
}

module.exports = AppController;
