module.exports = function(grunt)
{
    var setting = grunt.file.readJSON('example/src/import.json');

    grunt.initConfig({

        'unite-js' : {
            dev: {
                options : setting
            },
            app: {
                options : setting
            }
        }

    });

    grunt.loadTasks('tasks');

};
