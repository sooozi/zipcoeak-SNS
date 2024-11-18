// eslint-disable-next-line @typescript-eslint/no-require-imports
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // 번들 파일 이름
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000, // 포트 번호 (필요에 따라 수정 가능)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html', // 템플릿 파일 설정
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i, // .ts, .tsx 파일을 처리
                loader: 'ts-loader', // ts-loader 사용
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset', // 파일 로딩 처리
            },
            {
                test: /\.css$/i, // CSS 파일을 처리
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'], // 확장자 처리
    },
};

module.exports = config; // config 객체 반환
