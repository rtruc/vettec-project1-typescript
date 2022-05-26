const path = require('path');

module.exports = {
    mode: "production",
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
    },

    entry: path.resolve(__dirname, './css/index.css'),
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: 'css-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.css'],
    },
    output: {
        filename: 'styles.css',
        path: path.resolve(__dirname, 'css'),
    },
};