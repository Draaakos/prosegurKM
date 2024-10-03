const execSync = require('child_process').execSync;
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const hashFolder = String(execSync('cat bin/hash.txt'));

const getAppPath = filename =>
  path.resolve(__dirname, 'src', 'js', 'apps', `${filename}.app.js`);

const getConfig = async (env = { mode: 'development' }) => {
//   const baseConf = (await import('./src/server/engine/config.js')).default;
//   const environment = baseConf.env;
//   const sheets = baseConf.sheets;

  const config = {
    mode: env.mode,
    entry: {
      home: getAppPath('home'),
      dashboard: getAppPath('dashboard'),
    },
    output: {
      path: path.resolve(__dirname, 'static', hashFolder, 'js'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { modules: true } },
          ]
        }
      ]
    },
    resolve: {
      alias: {
        ui: path.resolve(__dirname, 'src', 'js', 'ui'),
        utils: path.resolve(__dirname, 'src', 'js', 'utils')
      },
      extensions: ['.js', '.jsx'],
      enforceExtension: false,
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(hashFolder)
      })
    ]
  };

  if (env.mode === 'production') {
    config.cache = false;
    config.optimization = {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: 'vendor'
      }
    };
    config.plugins.push(new MiniCssExtractPlugin());
    config.module.rules[1].use[0] = { loader: MiniCssExtractPlugin.loader };
  }

  return config;
}

module.exports = getConfig;
