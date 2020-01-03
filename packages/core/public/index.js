(async function() {
    var amis = amisRequire('amis/embed');
    let page = window.location.hash.substring(1) || 'main';
    amis.embed('#root', {
        type: "service",
        schemaApi: "get:/page/manager/" + page
    });
})();
