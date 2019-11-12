import * as _ from 'lodash'

const create = (list) => {
  return _.zipObject(list, list)
}

export const DATE_FORMAT = 'MMM D, YYYY'
export const ABSTRACT_MAX_WORDS = 200

export const USER_ROLE = {
  ADMIN: 'ADMIN',
  COUNCIL: 'COUNCIL',
  SECRETARY: 'SECRETARY',
  CUSTOM: 'CUSTOM',
  MEMBER: 'MEMBER',
  LEADER: 'LEADER',
}

export const USER_ROLE_TO_TEXT = {
  ADMIN: 'Admin',
  COUNCIL: 'Council',
  SECRETARY: 'Secretary General',
  CUSTOM: 'Custom',
  MEMBER: 'User',
  LEADER: 'Leader',
}

export const USER_LANGUAGE = {
  en: 'en',
  zh: 'zh'
}

export const USER_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
}

export const DEFAULT_IMAGE = {
  TASK: '/assets/images/task_thumbs/12.jpg',
  UNSET_LEADER: '/assets/images/User_Avatar_Other.png'
}

// Images
export const USER_AVATAR_DEFAULT = '/assets/images/user_blurred_white.png'

export const CONTENT_TYPE = create(['MARKDOWN', 'HTML'])

export const SORT_ORDER = create(['ASC', 'DESC'])

export const USER_PROFESSION = create(['ENGINEERING', 'COMPUTER_SCIENCE', 'PRODUCT_MANAGEMENT',
  'ART_DESIGN', 'SALES', 'MARKETING', 'BUSINESS_FINANCE', 'ENTREPRENEUR', 'STUDENT',
  'HEALTH_MEDICINE', 'LITERATURE_WRITING', 'TRANSLATION', 'LAW', 'ECONOMICS', 'MANAGEMENT', 'OTHER'])

// post
export const POST_STATUS = create(['DRAFT', 'PUBLISHED'])

export const POST_ABUSED_STATUS = create(['REPORTED', 'HANDLED'])
