require('dotenv').config()
import Redis from 'ioredis'
import * as functions from 'firebase-functions'

export const redis = new Redis({
  port: 13413,
  host: 'redis-13413.c1.us-east1-2.gce.cloud.redislabs.com',
  password: functions.config().redis.key || process.env.REDIS_PASSWORT,
})
