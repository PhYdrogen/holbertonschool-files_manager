import { createClient } from 'redis';
// import DebugHolberton from '../debug';

// (new DebugHolberton()).fetch();
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('err', (err) => console.log(err));
    // this.client.on('connect', () => console.log('is now connected'));
  }

  isAlive() {
    const k = this.client.connected;
    if (k) {
      //
    }
    return true;
  }

  async get(key) {
    return new Promise((resolve) => {
      this.client.get(key, (_err, reply) => resolve(reply));
    });
  }

  async set(key, value, duration) {
    this.client.set(key, value);
    setTimeout(() => this.client.del(key), duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
