import * as bcrypt from 'bcrypt'

export const encodePassword = (password: string): string => {
  const salt: string = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const isPasswordValid = (password: string, userPassword: string): boolean => {
  return bcrypt.compareSync(password, userPassword)
}
