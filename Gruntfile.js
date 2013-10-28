module.exports = function(grunt) {
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
          'main.css': 'main.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
