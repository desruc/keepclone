import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import paths from "./paths";

module.exports = {
  mode: "development",
  entry: [paths.entryPath],
  output: {
    filename: "[name].js",
    path: paths.outputPath,
    chunkFilename: "[name].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  performance: {
    hints: "warning",
    maxAssetSize: 20000000,
    maxEntrypointSize: 8500000,
    assetFilter: (assetFilename) => {
      return assetFilename.endsWith(".js");
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    contentBase: paths.outputPath,
    compress: true,
    hot: true,
    // historyApiFallback: true,
    // host: "localhost",
    // port: 3000,
  },
  plugins: [
    new ReactRefreshPlugin(),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ],
};
