const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/App.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public")
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node-modules/

            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }

        ]
    },
    resolve: {
      fallback: {
        util: require.resolve("util/"),
        path: require.resolve("path-browserify")
      }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        contentBase: path.join(__dirname, 'public')
    }
}