const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        pngquant: {
          quality: '90-95'
        }
      })
    ]
  },
  filenameHashing: process.env.NODE_ENV === 'development',
  transpileDependencies: [
    'vuetify',
  ],
  // assetsDir: 'assets',
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // Si tiene un subdominio colocar /tu_subdominio/
  lintOnSave: true,
  productionSourceMap: false
};
