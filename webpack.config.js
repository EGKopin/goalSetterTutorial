const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry:'./client-frontend/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title:'GoalSetter',
        })
    ]
};