module.exports = function( grunt ) {
	'use strict';

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			wisipro: {
				src: [
					'assets/js/src/wisipro.js'
				],
				dest: 'assets/js/wisipro.js'
			}
		},
		jshint: {
			browser: {
				all: [
					'assets/js/src/**/*.js',
					'assets/js/test/**/*.js'
				],
				options: {
					jshintrc: '.jshintrc'
				}
			},
			grunt: {
				all: [
					'Gruntfile.js'
				],
				options: {
					jshintrc: '.gruntjshintrc'
				}
			}   
		},
		uglify: {
			all: {
				files: {
					'assets/js/wisipro.min.js': ['assets/js/wisipro.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		test:   {
			files: ['assets/js/test/**/*.js']
		},
		
		sass:   {
			all: {
				files: {
					'assets/css/wisipro.css': 'assets/css/sass/wisipro.scss'
				}
			}
		},
		
		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			minify: {
				expand: true,
				
				cwd: 'assets/css/',
				src: ['wisipro.css'],
				
				dest: 'assets/css/',
				ext: '.min.css'
			}
		},
		watch:  {
			
			sass: {
				files: ['assets/css/sass/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			
			scripts: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		}
	} );

	// Default task.
	
	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin'] );
	

	grunt.util.linefeed = '\n';
};