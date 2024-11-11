// Generated using webpack-cli https://github.com/webpack/webpack-cli

// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const path = require('path');

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index.tsx',
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // 번들 파일 이름 추가
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000, // 포트 번호 추가 (필요에 따라 수정 가능)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
};

// eslint-disable-next-line no-undef
module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
