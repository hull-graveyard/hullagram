module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  var port = 8018;

  // ==========================================================================
  // Project configuration
  // ==========================================================================

  grunt.initConfig({
    
    connect: {
      server: {
        options: {
          port: port,
          base: 'public'
        }
      }
    },
    watch: {
      templates: {
        files: ['templates/**/*.hbs'],
        tasks: []
      },
      widgets: {
        files: ['app/widgets.js'],
        tasks: []
      }
      
    }
  });

  // default build task
  grunt.registerTask('default', ['connect', 'watch']);
};
