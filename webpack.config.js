const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
  mode: mode,

  devtool: "source-map",

  devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      hot: true
  },

  module: {
      rules: [
          
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          },
          {
              test: /\.s?css$/,
              use:[
                  MiniCssExtractPlugin.loader, 
                  "css-loader",
                  {
                      loader: "postcss-loader",
                      options:{
                          postcssOptions:{
                              plugins:[
                                ["postcss-preset-env"]
                              ]
                          }
                      }
                  },
                  "sass-loader"
                ]
          }
      ]
  },

  plugins:[new MiniCssExtractPlugin()]
}
