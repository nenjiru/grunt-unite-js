module.exports = function(grunt)
{
    var setting = grunt.file.readJSON('./example/src/import.json');

    grunt.initConfig({

        //js compile
        'grunt-unite-js' : {
            dev: {
                config : setting
            },
            app: {
                config : setting
            }
        }
    });

    grunt.loadTasks('tasks');
    //grunt.loadNpmTasks('grunt-unite-js');
};
