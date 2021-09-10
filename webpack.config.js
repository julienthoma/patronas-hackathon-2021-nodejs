const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = mode => ({
  target: 'web',
  entry: path.join(__dirname, 'client', 'index.tsx'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
    }),
  ].filter(Boolean),
});

const developmentConfig = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
};

const productionConfig = args => ({
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[contenthash].min.js',
    clean: true,
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ].filter(Boolean),
});

module.exports = (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(commonConfig(args.mode), developmentConfig);
    case 'production':
      return merge(commonConfig(args.mode), productionConfig(args));
    default:
      throw new Error('No matching configuration was found!');
  }
};
