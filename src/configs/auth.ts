require('dotenv').config()

export const authConstants = {
  jwt_secret: process.env.JWT_SECRET || 'gcMJQ2cARmUUk%EEreC96SF-8vyCMJ',
  jwt_user_secret: process.env.JWT_USER_SECRET || 'wqcusyte#$cARmUUk%EEreC96SF-8vyCMJ',
  expires_time: process.env.EXPIRES_TIME || '1d'
}
