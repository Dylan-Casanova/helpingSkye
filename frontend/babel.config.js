const path = require('path');

module.exports = {
  presets: [],
  plugins: [
      [
          'module-resolver',
          {
              root: ['.'],
              extensions: ['.css', '.js', '.json', '.jsx', '.ts', '.tsx'],
              alias: {
                  '@ac': path.resolve(__dirname, './src/components'),
                  'assets': path.resolve(__dirname, './src/assets'),
                  'constants': path.resolve(__dirname, './src/constants'),
                  'css': path.resolve(__dirname, './src/assets/css'),
                  'hooks': path.resolve(__dirname, './src/hooks'),
                  'images': path.resolve(__dirname, './src/assets/images'),
                  'pages': path.resolve(__dirname, './src/pages'),
                  'services': path.resolve(__dirname, './src/services'),
                  'shared': path.resolve(__dirname, './src/components/shared'),
                  'utils': path.resolve(__dirname, './src/utils'),
                  '##': path.resolve(__dirname, './src/examples'),
              },
          },
      ]
  ]
};