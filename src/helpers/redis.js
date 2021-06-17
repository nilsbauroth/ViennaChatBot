require('dotenv').config()
import Redis from 'ioredis'

export const redis = new Redis({
  port: 13413,
  host: 'redis-13413.c1.us-east1-2.gce.cloud.redislabs.com',
  password: process.env.REDIS_PASSWORT,
})
