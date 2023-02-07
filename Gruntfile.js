module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      build: {
        src: 'src/main.js',
        dest: 'dist/scripts.js'
      }
    },
    less: {
      build: {
        src: 'src/main.less',
        dest: 'dist/styles.css'
      }
    },
    watch: {
      files: [
        'src/**'
      ],
      tasks: [
        'browserify',
        'less',
      ]
    },
    connect: {
      server: {
        options: {
          port: 3333,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('dev', [
    'connect',
    'browserify',
    'less',
    'watch',
  ]);

  grunt.registerTask('prod', [
    'browserify',
    'less'
  ]);
}