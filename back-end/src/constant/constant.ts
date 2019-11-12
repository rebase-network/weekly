import * as _ from 'lodash'

const create = (constant_list: string[]): any => {
  const map = {}
  _.each(constant_list, key => {
    map[key] = key
  })

  return map
}

export const USER_ROLE = {
  ADMIN: 'ADMIN',
  COUNCIL: 'COUNCIL',
  SECRETARY: 'SECRETARY',
  CUSTOM: 'CUSTOM',
  MEMBER: 'MEMBER',
  LEADER: 'LEADER'
}

export const USER_LANGUAGE = {
  en: 'en',
  zh: 'zh'
}

export const CONTENT_TYPE = create(['MARKDOWN', 'HTML'])

export const ONE_DAY = 1000 * 60 * 60 * 24

// mongo do not support ASC and DESC options
export const SORT_ORDER = {
  ASC: 1,
  DESC: -1
}

export const POST_STATUS = create(['DRAFT', 'PUBLISHED'])

// DB sensitive data we do not want to explosure
export const DB_EXCLUDED_FIELDS = {
  USER: {
    SENSITIVE: '-password -salt -email -resetToken'
  }
}

export const DB_SELECTED_FIELDS = {
  USER: {
    NAME: 'profile.firstName profile.lastName username',
    NAME_EMAIL: 'profile.firstName profile.lastName username email',
    NAME_AVATAR: 'profile.avatar profile.firstName profile.lastName username'
  },
  POST: {
    ID: 'displayId'
  },
}
