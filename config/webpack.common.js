import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import dotenv from 'dotenv';

import paths from './paths';
import rules from './rules';

// Simplified version of how CRA does env variables
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]); // eslint-disable-line
  return prev;
}, {});

module.exports = {
  node: {
    __dirname: false
  },
  module: {
    rules
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js']
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      // favicon: `${paths.root}/src/static/favicon.ico`,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    })
  ]
};
