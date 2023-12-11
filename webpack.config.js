const path = require('path');
const nodeExternals = require("webpack-node-externals")

module.exports = {
  entry: './src/index.ts',
  mode: process.env.ENV || "development",
  target: "node",
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }    
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
};