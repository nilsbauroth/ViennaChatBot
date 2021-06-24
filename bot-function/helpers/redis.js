require('dotenv').config()
import * as functions from 'firebase-functions'
import Redis from 'ioredis'

export const redis = new Redis({
  port: 13413,
  host: 'redis-13413.c1.us-east1-2.gce.cloud.redislabs.com',
  password: functions.config().redis.key || process.env.REDIS_PASSWORT,
})
