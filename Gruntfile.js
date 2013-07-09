module.exports = function(grunt)
{
    var setting = grunt.file.readJSON('./import.json');

    grunt.initConfig({

        'unite-js' : {
            options: {
                grunt: {
                    taskID: 'example task',
                    target: './example/example.html',
                    output: './example/bin/app.js',
                    scriptDirectory: './example/'
                },
                html: {
                    include: './bin/app.js'
                }
            },
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
