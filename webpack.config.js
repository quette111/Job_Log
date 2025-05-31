const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js', // your main JS file (change if needed)
  target: 'node',          // for backend bundling
  externals: [nodeExternals()], // don't bundle node_modules
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // output bundle
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,     // .js or .mjs files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // transpile modern JS
          },
        },
      },
      {
        test: /\.css$/,      // if you import css files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',  // switch to 'production' for optimized build
};
