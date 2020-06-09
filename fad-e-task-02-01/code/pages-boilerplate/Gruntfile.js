const loadGruntTasks = require('load-grunt-tasks')
const sass = require('sass')

module.exports = grunt => {
  grunt.initConfig({
    clean: {
      folder: ['dist/**', 'temp/**'],
    },
    eslint: {
      target: ['src/assets/scripts/*.js']
    },
    // 通过sass编译成css文件
    sass: {
      options: {
         implementation: sass,
         sourceMap: true,
         compress: true
      },
      dist: {
        files: [{
          expand: true,
          src: ['src/assets/styles/*.scss'],
          dest: 'temp/',
          ext: '.css'
        }]
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      main: {
        files: [{
          expand: true,
          src: ['src/assets/scripts/*.js'],
          dest: 'temp/',
          ext: '.js'
        }]
      }
    },
    swigtemplates: {
      production: {
        dest: 'temp/',
        src: ['src/*.html']
      },
    },
    // https://github.com/pajtai/grunt-useref-example
    useref: {
      html: 'temp/src/*.html',
      temp: 'temp/src/'
    },
    // 检测改变，自动跑sass任务和js任务
    watch: {
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: 'src/assets/scripts/*.js',
        tasks: ['eslint', 'babel'],
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['public/*'],
            dest: 'temp/',
            filter: 'isFile'
          }
        ]
      }
    },
  })
  // 批量执行 并加载 所有配置中的 任务
  loadGruntTasks(grunt)
  grunt.registerTask('default', [
    'clean',
    'copy',
    'eslint',
    'sass',
    'babel',
    'swigtemplates',
    'useref',
    'watch'])
}