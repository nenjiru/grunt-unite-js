module.exports = function(grunt)
{
    var data;

    grunt.task.registerMultiTask('grunt-unite-js', 'JavaScript Compile', function()
    {
        data = this.data;

        switch (this.target)
        {
            case 'dev': includeFiles(data, 'dev', false); break;
            case 'app': includeFiles(data, 'app', true);  break;
        }
    });

    /**
     * Include files
     * @param data {Object}
     * @param attach {String}
     * @param app {Boolean}
     */
    function includeFiles (data, attach, app)
    {
        var files = data.src,
            srcfile = [];

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

        if (app === true)
        {
            uniteInclude(srcfile);
        }
        else
        {
            partialInclude(srcfile);
        }
    }

    /**
     * Dev mode
     * @param files {Array.<String>} source files
     */
    function partialInclude (files)
    {
        var target = data.target,
            code   = '';

        code += '<!-- INCLUDE-SCRIPT -->\n';
        files.forEach(function (src)
        {
            code += '<script src="'+ src +'"><\/script>\n';
        });
        code += '<!-- //INCLUDE-SCRIPT -->';

        //output script tag
        includeToHTML(target, code);
    }

    /**
     * App mode
     * @param files {Array.<String>} source files
     */
    function uniteInclude (files)
    {
        var target  = data.target,
            output  = data.output,
            include = data.include,
            concat  = '',
            code    = '';

        files.forEach(function (src)
        {
            concat += grunt.file.read(src);
        });

        grunt.file.write(output, concat);

        code += '<!-- INCLUDE-SCRIPT -->\n';
        code += '<script src="'+ include +'"><\/script>\n';
        code += '<!-- //INCLUDE-SCRIPT -->';

        //output script tag
        includeToHTML(target, code);
    }

    /**
     * Over write html file
     * @param target {String}
     * @param code {String}
     */
    function includeToHTML(target, code)
    {
        var html = grunt.file.read(target).replace(/<!-- INCLUDE-SCRIPT -->[\s\S]*<!-- \/\/INCLUDE-SCRIPT -->/m, code);
        grunt.file.write(target, html);
    }
};
