const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src-web/App.js',
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
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[hash].[ext]',
                },
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
    },

}