import path from 'path';

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: {
    landing: './client/scripts/landing.js',
    signup: './client/scripts/login.js',
    login: './client/scripts/loginUser.js',
    dashboard: './client/scripts/file.js',
  },
  target: 'web',
  output: {
   path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(new URL('.', import.meta.url).pathname, 'public'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};
