import Base from './Base'
import { Post } from './schema/PostSchema'
import { autoIncrement } from 'mongoose-plugin-autoinc'

export default class extends Base {
  protected getSchema() {
    return Post
  }
  protected getName() {
    return 'post'
  }
  protected buildSchema() {
    const schema = super.buildSchema()
    const options = {
      model: this.getName(),
      field: 'displayId',
      startAt: 1,
    }
    schema.plugin(autoIncrement, options)
    schema.index({ descUpdatedAt: -1 })
    schema.index({ likesNum: -1 })
    schema.index({ viewsNum: -1 })
    return schema
  }
}
