import { controller, get, post } from "@cc-server/binding";

@controller('/page/service')
class PageServiceController {
    @get('')
    index() {
        return {

        }
    }
}
