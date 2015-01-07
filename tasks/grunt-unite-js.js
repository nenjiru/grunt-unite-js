module.exports = function(grunt)
{

    grunt.task.registerMultiTask('unite-js', 'JavaScript Compile', function()
    {
        var options = this.data.options;

        if (~this.target.indexOf('dev')) {
            partialInclude(options, 'dev');
        } else if ((~this.target.indexOf('app'))) {
            uniteInclude(options, 'app');
        }
    });

    /**
     * Include files
     * @param files {Object}
     * @param attach {String}
     */
    function getIncludeFile (files, attach)
    {
        var srcfile = [];

        files.forEach(function (file)
        {
            if (typeof file === 'string')
            {
                srcfile.push(file);
            }
            else if (typeof file === 'object' && file[attach])
            {
                srcfile.push(file[attach]);
            }
        });

        return srcfile;
    }

    /**
     * Partial include
     * @param options {Object}
     * @param attach {String}
     */
    function partialInclude (options, attach)
    {
        var tasks = options.tasks;

        tasks.forEach(function (task)
        {
            var targets = task.grunt.targets || options.grunt.targets,
                scripts = task.script || options.script,
                script  = getIncludeFile(scripts, attach),
                code    = '';

            //include scripts
            code += '<!-- javascript -->\n';
            script.forEach(function (src)
            {
                code += '<script src="'+ src +'"><\/script>\n';
            });
            code += '<!-- //javascript -->';

            //output script tag
            includeToHTML(targets, code);
            grunt.log.write('complete: ' + task.grunt.taskID || options.grunt.taskID);
        });
    }

    /**
     * Unite include
     * @param options {Object}
     * @param attach {String}
     */
    function uniteInclude (options, attach)
    {
        var tasks = options.tasks;

        tasks.forEach(function (task)
        {
            var script    = getIncludeFile(task.script || options.script, attach),
                directory = task.grunt.scriptDirectory || options.grunt.scriptDirectory,
                targets   = task.grunt.targets || options.grunt.targets,
                output    = task.grunt.output || options.grunt.output,
                include   = task.html.include || options.html.include,
                concat    = '',
                code      = '';

            //cancat script
            script.forEach(function (src)
            {
                concat += grunt.file.read(directory + src);
            });

            //output
            grunt.file.write(output, concat);

            //include
            code += '<!-- javascript -->\n';
            code += '<script src="'+ include +'"><\/script>\n';
            code += '<!-- //javascript -->';

            //output script tag
            includeToHTML(targets, code);
            grunt.log.write('\n    create: ' + include);
            grunt.log.write('complete: ' + task.grunt.taskID || options.grunt.taskID);
        });
    }

    /**
     * Over write html file
     * @param targets {Array.<String>}
     * @param code {String}
     */
    function includeToHTML(targets, code)
    {
        var html;
        targets.forEach(function (target)
        {
            html = grunt.file.read(target).replace(/<!-- javascript -->[\s\S]*<!-- \/\/javascript -->/m, code);
            grunt.file.write(target, html);
            grunt.log.write('    write: ' + target);
        });
    }
};
