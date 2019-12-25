(async function() {
    var amis = amisRequire('amis/embed');
    amis.embed('#root', {
        definitions: {
            "editor-page": {
                "position": "right",
                "resizable": true,
                "title": `<% if (data.name) { print('页面 '+data.name+' 详情') } else { print ('新增页面') } %>`,
                "size": "lg",
                "body": {
                    "type": "form",
                    "submitText": '',
                    "title": "",
                    "controls": [
                        {
                            "name": "name",
                            "type": "text",
                        },
                        {
                            "name": "content",
                            "type": "editor",
                            "language": "json",
                            "editorTheme": "vs-dark",
                            "height": "800",
                            "label": false
                        },
                        {
                            "type": "button",
                            "label": "保存",
                            "actionType": "ajax",
                            "api": {
                                "url": "/page/manager/${_id}",
                                "data": {
                                    "name": "${name}",
                                    "content": "${content}"
                                }
                            }
                        }
                    ]
                }
            }
        },
        type: 'page',
        title: '页面管理',
        body: {
            name: "editor",
            type: "service",
            schemaApi: "get:/page/manager/editor"
        }
    });
})();
