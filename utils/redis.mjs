import { promisify } from 'util';
import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => console.log(error.message));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getval = await promisify(this.client.get).bind(this.client);
    const val = await getval(key);
    return val;
  }

  async set(key, val, duration) {
    this.client.set(key, val);
    this.client.expire(key, duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
