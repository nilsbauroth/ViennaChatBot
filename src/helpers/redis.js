require('dotenv').config()
import Redis from 'ioredis'

export const redis = new Redis({
  port: 15496,
  host: 'redis-15496.c284.us-east1-2.gce.cloud.redislabs.com',
  password: process.env.REDIS_PASSWORT,
})
