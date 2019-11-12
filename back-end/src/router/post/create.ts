import Base from '../Base'
import PostService from '../../service/PostService'

export default class extends Base {
  protected needLogin = true
  public async action() {
    const service = this.buildService(PostService)
    const rs = await service.create(this.getParam())
    return this.result(1, rs)
  }
}

