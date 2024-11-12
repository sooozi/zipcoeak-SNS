// Generated using webpack-cli https://github.com/webpack/webpack-cli

// eslint-disable-next-line @typescript-eslint/no-require-imports
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index.tsx',
    output: {
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
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
};

export default {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // 기타 설정들...
};
