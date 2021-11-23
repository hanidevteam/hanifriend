const path = require('path')
const DotEnv = require('dotenv-webpack')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: {
    analytics: path.resolve(__dirname, 'src', 'analytics.js'),
    embed: path.resolve(__dirname, 'src', 'embed.js')
  },
  module:{
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            max_line_len: 100
          }
        }
      })
    ]
  },
  plugins: [
    new DotEnv()
  ]
}
