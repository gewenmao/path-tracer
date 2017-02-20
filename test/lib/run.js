"use strict"
var fs = require('fs');

function rmDir(path) {
    let stat = fs.lstatSync(path);
    if (stat.isDirectory()) {
        let paths = fs.readdirSync(path);
        paths.map(p => {
            rmDir(path + '/' + p)
        })
        fs.rmdirSync(path);
    } else {
        fs.unlinkSync(path)
    }
}

function mkDir(path, obj) {
    let _path = path + '/' + obj.name;
    if (obj.type == 'dir') {
        fs.mkdirSync(_path);
        obj.paths.map(p => mkDir(_path, p));
    }
    if (obj.type == 'file') {
        fs.createWriteStream(_path);
    }
}

module.exports = function (path, obj) {
    let _path = path + '/' + obj.name;
    if (fs.existsSync(_path)) {
        rmDir(_path);
    }
    mkDir(path, obj);
}
