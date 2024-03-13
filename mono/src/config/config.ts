const dotenv = require('dotenv')
dotenv.config()

const config = {
  BACK_PORT_AUTH: process.env.BACK_PORT_AUTH as string,
  BACK_HOST_AUTH: process.env.BACK_HOST_AUTH as string,
  AWS_ACCESS_KEY_ID_AUTH: process.env.AWS_ACCESS_KEY_ID_AUTH as string,
  AWS_SECRET_ACCESS_KEY_AUTH: process.env.AWS_SECRET_ACCESS_KEY_AUTH as string,
  SECRET_JWT_AUTH: process.env.SECRET_JWT_AUTH as string,
  BACK_PORT_CONVERT: process.env.BACK_PORT_CONVERT as string,
  BACK_HOST_CONVERT: process.env.BACK_HOST_CONVERT as string,
  AWS_ACCESS_KEY_ID_CONVERT: process.env.AWS_ACCESS_KEY_ID_CONVERT as string,
  AWS_SECRET_ACCESS_KEY_CONVERT: process.env.AWS_SECRET_ACCESS_KEY_CONVERT as string,
  MONGODB_URI_CONVERT: process.env.MONGODB_URI_CONVERT as string,
  SECRET_JWT_CONVERT: process.env.SECRET_JWT_CONVERT as string
}

export default config
