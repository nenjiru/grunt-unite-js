module.exports = function(grunt)
{
    var data;

    grunt.task.registerMultiTask('grunt-unite-js', 'JavaScript Compile', function()
    {
        data = this.data;

        switch (this.target)
        {
            case 'dev': partialInclude(data, 'dev'); break;
            case 'app': uniteInclude(data, 'app');   break;
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
     * @param data {Object}
     * @param attach {String}
     */
    function partialInclude (data, attach)
    {
        var config = data.config,
            files = config.files;

        files.forEach(function (file)
        {
            var target = file.grunt.target,
                script = getIncludeFile(file.script, attach),
                code = '';

            //include scripts
            code += '<!-- javascript -->\n';
            script.forEach(function (src)
            {
                code += '<script src="'+ src +'"><\/script>\n';
            });
            code += '<!-- //javascript -->';

            //output script tag
            includeToHTML(target, code);
            grunt.log.write('complete: ' + file.grunt.taskID);
        });
    }

    /**
     * Unite include
     * @param data {Object}
     * @param attach {String}
     */
    function uniteInclude (data, attach)
    {
        var config = data.config,
            files = config.files;

        files.forEach(function (file)
        {
            var script = getIncludeFile(file.script, attach),
                directory = file.grunt.scriptDirectory,
                target = file.grunt.target,
                output = file.grunt.output,
                include = file.html.include,
                concat = '',
                code = '';

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
            includeToHTML(target, code);
            grunt.log.write('complete: ' + file.grunt.taskID);
        });
    }

    /**
     * Over write html file
     * @param target {String}
     * @param code {String}
     */
    function includeToHTML(target, code)
    {
        var html = grunt.file.read(target).replace(/<!-- javascript -->[\s\S]*<!-- \/\/javascript -->/m, code);
        grunt.file.write(target, html);
    }
};
