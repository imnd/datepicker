import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default {
  entry: './datepicker.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'datepicker.js',
    path: path.resolve(dirname(fileURLToPath(import.meta.url)), 'dist'),
  },
};
