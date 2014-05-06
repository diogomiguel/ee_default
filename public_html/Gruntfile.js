module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
		//uglify => Minify js
    pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			all: ['Gruntfile.js', 'javascript/main.js']
		},
		
		watch: {
			css: {
				files: ['production/sass/**/*.scss'],
				tasks: ['compass','cssmin']
			},
			scripts: {
				files: ['production/js/**/*.js'],
				tasks: ['jshint','concat']
			},
			images: {
				files: ['production/img/**/*.{png,jpg,gif}'],
				tasks: ['imagemin']
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'production/sass',
					cssDir: 'css',
					raw: 'preferred_syntax = :sass\n',
					outputStyle: 'compressed',
					noLineComments: true
				}
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */',
				separator: ';'
			},
			dist: {
				src: ['production/js/vendor/jquery-1.10.2.min.js', 'production/js/plugins.js', 'production/js/vendor/jquery.easing.js', 'production/js/main.js'],
				dest: 'production/js/all.js'
			},
		},
		uglify: {
			js: {
				files: [{
					expand: true,
					cwd: 'production/js',
					src: '**/all.js',
					dest: 'javascript'
				}]
			}
    },
		imagemin: {
			dynamic: {                         // Another target
				options: {
					optimizationLevel: 3,
					pngquant: true
				},
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'production/img',                   // Src matches are relative to this path
					dest: 'images/website'                  // Destination path prefix
				}]
			}
		}
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'compass', 'concat', 'uglify']);

};