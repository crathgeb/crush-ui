module.exports = {
  plugins: {
    'postcss-import': {
      resolve: (id, basedir) => {
        // Handle @styles alias
        if (id.startsWith('@styles')) {
          return id.replace('@styles', './src/styles');
        }
        return id;
      },
    },
    'autoprefixer': {},
    'cssnano': {
      preset: 'default',
    },
  },
};