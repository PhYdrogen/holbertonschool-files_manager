import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('err', (err) => console.log(err));
    this.client.on('connect', () => console.log('is now connected'));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      if (key === '') reject(Error('No key'));
      if (typeof key !== 'string') reject(Error('Key must be string'));
      this.client.get(key, (_err, reply) => resolve(reply));
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      if (key === '') reject(Error('No key'));
      if (typeof key !== 'string') reject(Error('Key must be string'));
      resolve(this.client.set(key, value));
      setTimeout(() => this.client.del(key), duration);
    });
  }

  async del(key) {
    return new Promise((resolve) => {
      resolve(this.client.del(key));
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
