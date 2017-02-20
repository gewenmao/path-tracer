'use strict'
var fs = require('fs')

module.exports = (function() {

    function isFile(path) {
        var stats = fs.lstatSync(path);
        return stats.isFile();
    }

    function isDir(path) {
        var stats = fs.lstatSync(path);
        return stats.isDirectory();
    }

    function isExist(path) {
        return fs.existsSync(path);
    }

    function getFiles(path, opt) {
        var through = true,
            pattern = null,
            result = [];

        if (!fs.existsSync(path)) {
            return result;
        }


        if (typeof opt == 'object') {
            through = opt.through;
            pattern = opt.pattern;
        }

        let stat = fs.lstatSync(path);

        if (stat.isDirectory()) {
            let paths = fs.readdirSync(path);
            let files = [], dirs = [];

            paths.map(p => {
                p = path + '/' + p;
                let stat = fs.lstatSync(p);
                if (stat.isFile()) {
                    files.push(p);
                } else {
                    dirs.push(p);
                }
                    
            });

            if (pattern instanceof RegExp) {
                files = files.filter(f => {
                    pattern.lastIndex = 0;
                    return pattern.test(f)
                });
            }

            result = result.concat(files);

            if (through !== false) {
                dirs.map(d => {
                    result = result.concat(getFiles(d, opt));
                })
            }

        }
        
        return result;
    }

    return {
        getFiles: getFiles
    }

})();


