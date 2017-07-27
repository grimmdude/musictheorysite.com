module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      production: {
        options: {
          debug: false
        },
        src: 'assets/js/guitar-chords/index.js',
        dest: 'assets/build/guitar-chords.js'
      }
    },
    concat: {
      js: {
          files: {
          'assets/build/ear-training.js': [
                          //'bower_components/modernizr/modernizr.js',
                          //'bower_components/angular/angular.min.js',
                          'assets/js/ear-training/*.js'
                          ],
          'assets/build/main.js' : [
                          'bower_components/js-cookie/src/js.cookie.js',
                          'bower_components/jquery/dist/jquery.js',
                          'bower_components/underscore/underscore-min.js',
                          'assets/js/namethatkey.js',
                          'assets/js/scale_generator.js',
                          'assets/js/namethatchord.js',
                          'bower_components/bootstrap/dist/js/bootstrap.min.js',
                          'assets/js/app.js'

          ],
          'assets/build/vexflow.js' : [
                          'node_modules/vextab/releases/vextab-div.js',
                          'assets/js/vexflow-config.js'
          ],
          'assets/build/angular.min.js' : [
                          'bower_components/angular/angular.min.js'
          ],
          'assets/build/raphael.js' : [
                          'bower_components/raphael/raphael.min.js'
          ]
        }
      },
      css: {
        files: {
          'assets/build/style.css' : [
                          'assets/css/fonts.css',
                          'bower_components/bootstrap/dist/css/bootstrap.min.css',
                          'assets/css/all.css',
                          'assets/css/namethatkey.css'
                          ]
        }
      }
    },
    uglify: {
      options : {
        mangle : false
      },
      my_target : {
        files : {
          'assets/build/namethatkey.min.js'  : ['assets/js/namethatkey.js'],
          'assets/build/ear-training.min.js' : ['assets/js/ear-training/*.js'],
          'assets/build/main.min.js' : ['assets/build/main.js'],
          'assets/build/vexflow.min.js':['assets/build/vexflow.js'],
          'assets/build/guitar-chords.min.js':['assets/build/guitar-chords.js']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'assets/build/style.min.css': ['assets/build/style.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['browserify', 'concat', 'uglify', 'cssmin']);
};