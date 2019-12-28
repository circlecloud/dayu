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

function connectServer(namespace, id) {
    var server = io(namespace, {
        path: '/ws',
        transports: ['websocket']
    });
    server.on('connect', () => {
        term.writeln('connect')
        server.emit('logs', {
            id: id,
            tail: "200"
        })
    });
    server.on('message', data => {
        term.write(data.toString() + '\r\n');
    });
    server.on('disconnect', () => {
        term.reset();
        term.writeln('disconnect');
    });
}

console.log(query);

term.writeln(`Recover Action: ${query.action} Data: ${query.data}`)

switch (query.action) {
    case "container":
    case "service":
        connectServer(`/${query.action}`, query.data)
        break;
    default:
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
}

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
