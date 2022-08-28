import * as dotenv from 'dotenv';
dotenv.config();



const config = {
  secret: process.env.secretJwTKEY
}

export default config