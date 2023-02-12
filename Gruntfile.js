module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dev: {
        src: 'src/main.js',
        dest: 'dist/scripts.js',
        options: {
          alias: [
            './src/_config.dev.js:config'
          ]
        }
      },
      prod: {
        src: 'src/main.js',
        dest: 'dist/scripts.js',
        options: {
          alias: [
            './src/_config.prod.js:config'
          ]
        }
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
    'browserify:dev',
    'less',
    'watch'
  ]);

  grunt.registerTask('prod', [
    'browserify:prod',
    'less'
  ]);
}