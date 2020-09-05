module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('postcss-css-variables')(),
    require('cssnano')()
  ],
}