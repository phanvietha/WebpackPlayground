const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  watch: true,
  output: {
    // Use key of entry point as name
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "cheap-module-eval-source-map",
  entry: {
    application: "./src/index.js",
    admin: "./src/admin.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}), // Since we override default optimization, so have to respecify optimze for js
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // "style-loader", // Replace with MiniCssExtractPlugin
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: ["last 3 versions", "ie >9"],
                }),
              ],
            },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              // hash “1c28f43” was resulted from the hash algorithm used by webpack based on the content of the file, so you’ll get a different hash whenever the image file changed.,
              name: "[name].[hash:7].[ext]",
            },
          },
          { loader: "image-webpack-loader" },
        ],
      },
    ],
  },
};
