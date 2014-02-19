module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
		//uglify => Minify js
    pkg: grunt.file.readJSON('package.json'),
	
		watch: {
    	css: {
      	files: ['production/sass/**/*.scss'],
      	tasks: ['compass','cssmin']
			},
			scripts: {
		    files: ['production/js/**/*.js'],
		    tasks: ['uglify']
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
	        raw: 'preferred_syntax = :sass\n'
	      }
	    }
	  },
    uglify: {
			js: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      files: [{
	        expand: true,
          cwd: 'production/js',
          src: '**/*.js',
          dest: 'javascript'
	      }]
			}
    },
		cssmin: {
		  minify: {
		    expand: true,
		    cwd: 'production/css',
		    src: ['*.css', '!*.min.css'],
		    dest: 'css',
		    ext: '.min.css'
		  }
		},
		imagemin: {                         // Task
	    dynamic: {                         // Another target
				options: {                       // Target options
	        optimizationLevel: 3,
					pngquant: true
	      },
	      files: [{
	        expand: true,                  // Enable dynamic expansion
	        cwd: 'production/img',                   // Src matches are relative to this path
	        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
	        dest: 'images/website'                  // Destination path prefix
	      }]
	    }
	  }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['compass', 'cssmin']);

};