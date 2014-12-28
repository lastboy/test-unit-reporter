'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({


        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


        concat: {
            noamd: {
                files: { './target/tmr-min.js': [
                    "./target/tmr-mapper-min.js",
                    './target/tmr-base-min.js'
                ] }
            },
            noamdall: {
                files: { './target/tmr-min-all.js': [
                    "./node_modules/underscore/underscore-min.js",
                    "./node_modules/js.utils/target/jsutils-min.js",
                    "./target/tmr-min.js"
                ] }
            }

        },

        uglify: {
            noamd: {
                files: { './target/tmr-min.js': ['./target/tmr-min.js'] }
            },
            noamdall: {
                files: { './target/tmr-min-all.js': ['./target/tmr-min-all.js'] }
            }
        },


        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tests'],
            target: ['target']
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('noamd', function () {
        grunt.task.run('concat:noamd');
        grunt.task.run('uglify:noamd');
    });

    grunt.registerTask('noamdall', function () {
        grunt.task.run('concat:noamdall');
        grunt.task.run('uglify:noamdall');
    });

    grunt.registerTask('default', ['clean:target'], function () {
        var Build = require("./build/build.js"),
            buildimpl;

        var done = this.async();

        buildimpl = new Build(function () {

            done(true);


            grunt.task.run('noamd');
            grunt.task.run('noamdall');

        });

    });

    grunt.registerTask('install', ['default']);

    grunt.registerTask('test', ['clean:tests'], function () {

        var open = require("open"),
            ps = require("package-script"),
            me = this;
//
//        ps.spawn([{
//            command: "npm",
//            args: ["test"]
//
//        }], {}, function () {          
//
//           
//            
//        });

       
        ps.spawn([{
            command: "node",
            args: ["test/web-server.js", "test/index.html", "8081"],
            spawnopt: { stdio: 'inherit'}
        }],{log: true}, function () {
            
                     
        });
        
         ps.spawn([{
            command: "node",
            args: ["test/web-server.js", "test/index-require.html", "8082"],
            spawnopt: { stdio: 'inherit'}
        }],{log: true}, function () {
            
                     
        });
        
        this.async();
        open("http://localhost:8081", "firefox");
        
        open("http://localhost:8082", "firefox");
        
        
        setTimeout(function() {
            process.exit(0);
        }, 15000);

      

    });

};
