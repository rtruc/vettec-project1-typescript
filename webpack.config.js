const path = require('path');

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: path.resolve(__dirname, './ts/index.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'js'),
        clean: true,
    },

    
};