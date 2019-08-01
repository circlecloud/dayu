let command = '';
Terminal.applyAddon(fit);
Terminal.applyAddon(attach);
Terminal.applyAddon(fullscreen);
var term = new Terminal({
    experimentalCharAtlas: 'dynamic',
    cursorBlink: false,
});
term.open(document.getElementById('terminal'));
term.toggleFullScreen();
term.fit();

window.onresize = function() {
    term.fit();
}

let query = {}
location.search.substring(1).split("&").forEach(q => {
    let qy = q.split("=", 2);
    query[qy[0]] = qy[1]
})

console.log(query);

var system = io('/', {
    path: '/ws',
    transports: ['websocket']
});

system.on('connect', () => {
    system.emit('events', {})
})

system.on('message', data => {
    term.write(data.toString() + '\r\n');
});

var container = io('/container', {
    path: '/ws',
    transports: ['websocket']
});
container.on('connect', () => {
    term.writeln('connect')
    if (query.action) {
        term.writeln(`Recover Action: ${query.action} Data: ${query.data}`)
        switch (query.action) {
            case "container":
                container.emit('logs', {
                    id: query.data,
                    // since: Date.now() / 1000 - 60 * 15,
                    // until: Date.now() / 1000,
                    // stderr: false,
                    tail: "200"
                })
                break;
            default:
        }
    }
});
term.on('data', async data => {
    if (data == '\t') {
        return;
    }
    term.write(data);
    if (data == '\r') {
        term.write('\n');
        container.emit('logs', {
            id: command
        })
        command = '';
    } else {
        command += data;
    }
});
container.on('message', data => {
    term.write(data.toString() + '\r\n');
});
container.on('disconnect', () => {
    term.reset();
    term.writeln('disconnect');
});
