import { controller, get, post } from "@cc-server/binding";

@controller('/page')
class PageDashboardController {
    @get('')
    async page() {
        return {
            type: 'page',
            title: '大禹容器管理',
            body: [{
                type: "button",
                label: "刷新页面",
                level: "dark",
                actionType: "reload",
                target: "editor"
            }, {
                type: 'divider'
            }, {
                "name": "editor",
                "type": "service",
                "className": "m-t",
                "schemaApi": "/page/editor"
            }]
        }
    }
    @post('/editor')
    async editor() {
        return {
            status: 0,
            msg: '',
            data: {
                "type": "form",
                "initApi": "post:/page/service/list",
                "title": "",
                "controls": [{
                    "name": "api",
                    "type": "editor",
                    "language": "json",
                    "label": "JSON",
                }]
            }
        }
    }
    @post('/dashboard')
    async dashboard() {
        return {
            status: 0,
            msg: '',
            data: {
                "type": "form",
                "api": "https://houtai.baidu.com/api/form/saveForm?waitSeconds=2",
                "title": "常规模式",
                "mode": "normal",
                "controls": [{
                    "type": "email",
                    "name": "email",
                    "required": true,
                    "placeholder": "请输入邮箱",
                    "label": "邮箱"
                }, {
                    "type":
                        "password",
                    "name": "password",
                    "label": "密码",
                    "required": true,
                    "placeholder": "请输入密码"
                }, {
                    "type": "checkbox",
                    "name": "rememberMe",
                    "label": "记住登录"
                }, {
                    "type": "submit",
                    "btnClassName": "btn-default",
                    "label": "登录"
                }]
            }
        }
    }
}
