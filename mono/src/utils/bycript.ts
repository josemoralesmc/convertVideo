import bcrypt from 'bcrypt'

export const createHash = (password: string): string => {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  return hash
}

export const isValidatePassword = (user: string, password: string): boolean =>bcrypt.compareSync(user, password);
