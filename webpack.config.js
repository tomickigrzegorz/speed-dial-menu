const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function prodPlugin(plugin, argv) {
  return argv.mode === 'production' ? plugin : () => {};
}

// Configure Html Webpack Plugin
const configureHtmlWebPackPlugin = () => {
  return {
    filename: 'index.html',
    template: './sources/index.html',
  };
};

// Configure Clean Webpack Plugin
const configureCleanWebpackPlugin = () => {
  return {
    verbose: true,
  };
};

// Configure Mini Css Extrac Plugin
const configureMiniCssExtractPlugin = () => {
  return {
    filename: './[name].css',
  };
};

// Configure Outpu
const configureOutput = () => {
  return {
    path: path.resolve(__dirname, './docs'),
    filename: './[name].js',
    library: 'SpeedDial',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  };
};

// Configure Babel loader
const configureBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  };
};

// Configure Style Loader
const configureStyleLoader = mode => {
  return {
    test: /\.(css|sass|scss)$/,
    use: [
      mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  };
};

module.exports = (env, argv) => {
  return {
    devtool: argv.mode === 'production' ? 'none' : 'source-map',
    mode: argv.mode,
    entry: {
      SpeedDial: './sources/index.js',
    },
    output: configureOutput(),
    module: {
      rules: [configureBabelLoader(), configureStyleLoader(argv.mode)],
    },
    plugins: [
      prodPlugin(new CleanWebpackPlugin(configureCleanWebpackPlugin()), argv),
      new MiniCssExtractPlugin(configureMiniCssExtractPlugin()),
      new HtmlWebPackPlugin(configureHtmlWebPackPlugin()),
    ],
  };
};
