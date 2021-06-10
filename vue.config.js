module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/vue-admin-work-x',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: 5567,
    open: true
  }
}
