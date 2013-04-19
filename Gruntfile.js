//------------------------------------------------------------------------------
//  Settings
//------------------------------------------------------------------------------
var IMPORT_FILE = 'example/import.json';
var OUTPUT_JS   = 'bin/app.js';
var TARGET_HTML = 'example.html';
var TARGET_JS   = 'bin/app.js';

//------------------------------------------------------------------------------
//  Grunt config
//------------------------------------------------------------------------------
module.exports = function(grunt)
{
    var setting = grunt.file.readJSON(IMPORT_FILE);

    grunt.initConfig({

        //js compile
        'grunt-unite-js' : {
            dev: {
                src    : setting.files,
                target : TARGET_HTML
            },
            app: {
                src    : setting.files,
                output : OUTPUT_JS,
                target : TARGET_HTML,
                include: TARGET_JS
            }
        }
    });

    //grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-unite-js');
};
