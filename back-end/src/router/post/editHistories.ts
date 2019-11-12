import Base from '../Base'
import PostService from '../../service/PostService'

export default class extends Base {
  public async action() {
    const service = this.buildService(PostService)
    const param = this.getParam()

    const result = await service.editHistories(param)

    return this.result(1, result)
  }
}
