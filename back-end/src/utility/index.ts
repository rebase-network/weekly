import utilCrypto from './crypto'
import mail from './mail'
import validate from './validate'
import user from './user'
import * as logger from './logger'

export { utilCrypto, user, validate, mail, logger }

export const getEnv = () => process.env.NODE_ENV
