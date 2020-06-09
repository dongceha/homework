// 实现这个项目的构建任务

const { src, dest, parallel, series, watch } = require('gulp')
const ghPages = require('gulp-gh-pages');

const del = require('del')
const browserSync = require('browser-sync')

// 自动加载 plugin 
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const eslint = require('gulp-eslint');

const bs = browserSync.create()

// 清空文件
const clean = () => {
    return del(['dist', 'temp'])
}
// 处理 scss 文件
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
      .pipe(plugins.sass({ outputStyle: 'expanded' }))
      .pipe(dest('temp'))
      // 以流的方式，推到 浏览器里面
      .pipe(bs.reload({ stream: true }))
}
// 处理 js 文件
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
    //   .pipe(eslint())
    //   .pipe(eslint.format())
      .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
}
// 处理模板文件
const page = () => {
    return src('src/*.html', { base: 'src' })
      .pipe(plugins.swig({ defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
}
// 处理 image 文件
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
      .pipe(plugins.imagemin())
      .pipe(dest('dist'))
}
// 处理字体文件
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
      .pipe(plugins.imagemin())
      .pipe(dest('dist'))
}

// 额外的 文件进行复制
const extra = () => {
    return src('public/**', { base: 'public' })
      .pipe(dest('dist'))
}

const deploy = () => {
    return src('./dist/**/*')
      .pipe(ghPages())
  }
const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    // 单纯的只是 监听，并不对 这三种文件进行 构建
    // 也不对 这三种文件 进行 修改
    watch([
      'src/assets/images/**',
      'src/assets/fonts/**',
      'public/**'
    ], bs.reload)
    // 初始化 brower-sync
    bs.init({
      notify: false,
      port: 2080,
      // open: false,
      // files: 'dist/**',
      // dist 只是 最后打包的目录，和目前的目录无关
      server: {
        baseDir: ['temp', 'src', 'public'], // 寻找文件，从第一个开始找，找到最后一个
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    })
}

/**
 * <!-- build:css assets/styles/vendor.css -->
 * <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
 * <!-- endbuild --> 
 */
/** 对所有的 文件打包到 一个 vender 里面
 * <!-- build:js assets/scripts/vendor.js -->
  <script src="/node_modules/jquery/dist/jquery.js"></script>
  <script src="/node_modules/popper.js/dist/umd/popper.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
  <!-- endbuild -->
 */
// 通过注释，执行 useref 
// 所以需要构建注释，也就是说，先执行 compile 再去执行这个 
const useref = () => {
    // 使用 temp 是因为 防止 dist 同时读取写入 会造成冲突
    return src('temp/*.html', { base: 'temp' })
      // 指定 查找 资源的 目录，比如 node_modules
      .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
      // html js css  gulp-if 匹配之后，会自动创建一个转换流
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace: true, // 折叠掉 空白字符
        minifyCSS: true,
        minifyJS: true
      })))
      .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

// 上线之前执行的任务
const build =  series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)
// 在启动 服务器的时候，不进行压缩
const develop = series(compile, serve)

module.exports = {
  clean,
  build,
  serve: develop,
  start: develop,
  lint: script,
  deploy
}