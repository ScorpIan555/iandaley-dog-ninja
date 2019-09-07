const path = require('path');
const glob = require('glob');

module.exports = {
  target: 'serverless',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    console.log('webpack.config.buildId:::', buildId);
    console.log('webpack.config.dev:::', dev);
    console.log('webpack.config.isServer:::', isServer);
    console.log('webpack.config.defaultLoaders:::', defaultLoaders);
    console.log('webpack.config.webpack:::', webpack);
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed', // These options are from node-sass: https://github.com/sass/node-sass
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    );
    config.node = {
      fs: 'empty',
      dgram: 'empty'
    };
    return config;
  },
  exportPathMap: function(defaultPathMap) {
    console.log('defaultPathMap:::', defaultPathMap);
    return {
      '/': { page: '/' }
    };
  }
};
