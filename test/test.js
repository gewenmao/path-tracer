'use strict'
var config = require('./config.json');
var tracer = require('../index.js')
var assert = require('assert');
var run = require('./lib/run.js');

process.chdir('./test');

run('.', config.path);


describe('path-trace:', function() {
    describe('#getFiles()', function() {
        const allFiles = [ 
            './_path/index.html',
            './_path/static/body.css',
            './_path/static/head.css',
            './_path/static/main.js' 
        ];
        it('should get files by default', function() {
            let files = tracer.getFiles('./_path');
            let isOk = files.length === allFiles.length; 

            allFiles.map(f => {
                if (files.indexOf(f) == -1) {
                    isOk = false;
                }
            });
            assert.equal(true, isOk);
        });

        it('should get files by pattern', function() {
            let files = tracer.getFiles('./_path', {pattern: /.css$/g});
            let isOk = files.length == 2;

            if (files.indexOf('./_path/static/body.css') == -1 || files.indexOf('./_path/static/head.css') == -1) {
                isOk = false;
            }
            assert.equal(true, isOk);
        })

        it('should get files by through = false', function() {
            let files = tracer.getFiles('./_path', {through: false});
            let isOk = files.length == 1;

            if (files.indexOf('./_path/index.html') == -1) {
                isOk = false;
            }
            assert.equal(true, isOk);
        })

        it('should get files by through & pattern', function() {
            let files = tracer.getFiles('./_path', {pattern: '/html$/g', through: false});
            let isOk = files.length == 1;

            if (files.indexOf('./_path/index.html') == -1) {
                isOk = false;
            }
            assert.equal(true, isOk);
        })

        it('should get files by file', function() {
            let files = tracer.getFiles('./_path/index.html');
            let isOk = files.length == 0;

            assert.equal(true, isOk);
        })
    });
});
