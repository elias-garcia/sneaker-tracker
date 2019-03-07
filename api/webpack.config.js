const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/api.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })]
  }
}