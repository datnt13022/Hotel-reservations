import * as crypto from 'crypto'

export const randomString = (size = 16) => {
  return crypto.randomBytes(size).toString('base64').slice(0, size)
}

export const hashString = (string: string) => {
  const hmac = crypto.createHmac('sha256', randomString())
  return hmac.update(string).digest('hex')
}

export const padNumber = (number: any, padding: number = 6) => {
  return String(number).padStart(padding, '0')
}
