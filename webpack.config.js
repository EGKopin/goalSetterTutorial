const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry:'./client-frontend/index.js',
    output: {
        publicPath: '/',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        host:'localhost',
        port: 8080,
        hot:true, //enable hot reloading on sever
        historyApiFallback: true, //fallback to root for other urls
        static: {
            publicPath: '/',
            directory: path.resolve(__dirname, 'build'),
        },
        /**
         * proxy is required in order to make api calls to
         * express server while using hot-reload webpack server
         * routes api fetch requests from localhost:8080/api/* (webpack dev server)
         * to localhost:3000/api/* (where our Express server is running)
         */
        proxy: {
            '/api/**': {
                target: 'http://localhost:5000/',
                secure: false,
            }
        }
    },
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title:'GoalSetter',
            template: './client-frontend/index.html'
        })
    ],
};