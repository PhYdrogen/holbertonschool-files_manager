import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * Classe AppController
 * Contient des méthodes pour interagir avec l'état de l'API
 */
class AppController {
  static getStatus(req, res) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      res.status(200).json({ redis: true, db: true });
    }
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    const obj = {
      users,
      files,
    };
    res.status(200).json(obj);
  }
}

module.exports = AppController;
