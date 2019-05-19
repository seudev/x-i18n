module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    rules: {
      babel: {
        test: /\.(js|jsx)$/,
      },
    },
    extra: {
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      },
    }
  }
}
