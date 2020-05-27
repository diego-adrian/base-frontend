const ImageminPlugin = require('imagemin-webpack-plugin').default;
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
    },
    plugins: [
      new VuetifyLoaderPlugin(),
      // new BundleAnalyzerPlugin(),
      new ImageminPlugin({
        pngquant: {
          quality: '90-95'
        }
      })
    ]
  },
  filenameHashing: process.env.NODE_ENV === 'production',
  transpileDependencies: [
    'vuetify',
  ],
  // assetsDir: 'assets',
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // Si tiene un subdominio colocar /tu_subdominio/
  lintOnSave: true,
  productionSourceMap: false
};
