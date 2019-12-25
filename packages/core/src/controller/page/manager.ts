import { DBClient } from '@cc-server/db'
import { controller, get, post, httpDelete, requestParam, requestBody, BaseHttpController } from "@cc-server/binding";
import { inject, named } from '@cc-server/ioc'

class Page {
    _id: string;
    name: string;
    content: string;
}

@controller('/page/manager')
class PageManagerController extends BaseHttpController {
    @inject(DBClient)
    @named('page')
    private client: DBClient<Page>

    @get('/list')
    async list() {
        let pages = await this.client.find({})
        return {
            status: 0,
            data: pages
        }
    }

    @get('/:name')
    async index(@requestParam('name') name: string) {
        let page = await this.client.findOne({ name })
        if (!page) {
            return {
                status: 404,
                msg: `未找到 ${name} 的页面配置数据!`
            }
        }
        return {
            status: 0,
            data: JSON.parse(page.content)
        }
    }

    @post('/')
    async add(@requestBody() page: Page) {
        let result = this.client.insertOne(page);
        return { status: result ? 0 : 1, msg: result ? '插入 ' + page.name + ' 成功!' : '插入 ' + page.name + ' 失败!' };
    }

    @post('/:id')
    async update(@requestParam('id') _id: string, @requestBody() page: Page) {
        let result = this.client.updateById(_id, page)
        return { status: result ? 0 : 1, msg: result ? '更新 ' + page.name + ' 成功!' : '更新 ' + page.name + ' 失败!' };
    }

    @httpDelete("/:id")
    async delete(@requestParam('id') _id: string) {
        let result = this.client.deleteById(_id)
        return { status: result ? 0 : 1, msg: result ? '删除成功!' : '删除失败!' };
    }
}