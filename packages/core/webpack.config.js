const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    'react-vendors': ['react', 'react-dom'],
    main: {
      import: './src/index.tsx',
      dependOn: 'react-vendors',
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: /packages[/\\]\w+[/\\]src/,
      use: 'ts-loader',
    }, {
      test: /\.css$/,
      include: /packages[/\\]\w+[/\\]src/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-import',
                'tailwindcss',
                'autoprefixer',
              ],
            },
          },
        },
      ],
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      exclude: /node_modules/,
      type: 'asset/resource',
    }, {
      test: /\.svg$/,
      exclude: /node_modules/,
      type: 'asset/source',
    }],
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      'tiptap': resolve(__dirname, '../tiptap/src'),
    },
  },
  devtool: isProd ? false : 'inline-source-map',
  devServer: {
    port: 3001,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public/',
        globOptions: {
          ignore: ['**/index.html'],
        },
      }],
    }),
  ],
}
