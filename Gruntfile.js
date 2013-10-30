module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      styles: {
        files: ['styles/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    },

    sass: {
      dist: {
        files: {
          'styles/main.css': 'styles/main.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);
};
