import * as uuid from 'uuid'
import {expect} from 'chai'
import {constant} from '../../constant';
import {mail} from '../../utility'
import db from '../../db'
import '../../config'
import PostService from '../PostService'
import UserService from '../UserService'

declare var global, describe, test, require, process, beforeAll, afterAll

const sinon = require('sinon')
const user: any = {}
let DB, mailMethod
const service: any = {}

beforeAll(async () => {
  DB = await db.create()

  // stub mail
  mailMethod = sinon.stub(mail, 'send', (options) => {
    return Promise.resolve()
  })

  await DB.getModel('User').remove({
    username: global.DB.MEMBER_USER.username
  })
  await DB.getModel('User').remove({
    username: global.DB.COUNCIL_USER.username
  })
  await DB.getModel('Post').remove({})

  // create a test user as member role
  const userService = new UserService(DB, {
    user: undefined,
  })
  user.admin = await userService.getDBModel('User').findOne({role: constant.USER_ROLE.ADMIN})
  user.member = await userService.registerNewUser(global.DB.MEMBER_USER)
  const council = await userService.registerNewUser(global.DB.COUNCIL_USER)
  // added COUNCIL role to council
  const adminService = new UserService(DB, {
    user: user.admin
  })

  await adminService.updateRole({
    userId: council._id,
    role: constant.USER_ROLE.COUNCIL
  })
  user.council = await userService.getDBModel('User').findOne({_id: council._id})

  // service setup
  service.member = new PostService(DB, {user: user.member})
  service.council = new PostService(DB, {user: user.council})
  service.admin = new PostService(DB, {user: user.admin})
})

describe('Tests for Post', () => {
  let post1: any
  test('member attempt to create a post should pass', async () => {
    try {
      // const permission = await permission.findOne({ resourceType: 'Post' });
      // post1 = await service.member.create()
    } catch (err) {
      // expect(err).to.be.equal('')
    }
  })

  test('owner attempt to update his/her post should pass', async () => {
    try {
      // await service.member.update({ id: post1._id, title: 'abc' })
    } catch (err) {
      // expect(err).to.be.equal('')
    }
  })

  test('non-owner attempt to update post should fail', async () => {
    try {

    } catch (err) {
      // expect(err).to.be.equal('Only owner can edit post')
    }
  })

  test('member attempt to list post should pass', async () => {
    try {

    } catch (err) {
      // expect(err).to.be.equal('Only owner can edit post')
    }
  })

  test('member attempt to show post should pass', async () => {
    try {

    } catch (err) {
      // expect(err).to.be.equal('Only owner can edit post')
    }
  })
})
