module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';',
				sourceMap: true
			},
			dist: {
				src: ['node_modules/three/*.min.js', 'src/js/libs/*.js', 'src/js/*js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['concat'],
				options: {
					atBegin: true
				}
		    }
		}
	});

    grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-string-replace' );

    grunt.registerTask("debug", [ "concat", "watch" ]);
    grunt.registerTask( 'default', ['concat', 'uglify'] );
};

