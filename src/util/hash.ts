
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const genPassHash = async (password) => {
  const  hash = await bcrypt.hash(password, saltOrRounds);
  return hash
}

export const comparePass = async (password, hash) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch
}