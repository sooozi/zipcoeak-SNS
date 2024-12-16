import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

// .env 파일 로드
dotenv.config();

// __dirname 대체 방법
const __dirname = path.resolve();

// 또는 경로가 루트에 index.html이 있는 경우
const templatePath = path.join(__dirname, 'index.html');

const isProduction = process.env.REACT_APP_API_KEY === 'production';

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? '[name].[contenthash].js' : '[name].js',
        clean: true,
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'public'),
            watch: false, // 감시 기능 끔
        },
        watchFiles: {
            paths: ['src/**/*'], // 필요한 파일만 감시
            options: {
                ignored: [
                    '**/node_modules/**',
                    '**/dist/**', // dist 폴더 제외
                    '**/*.log', // 로그 파일 제외
                    'C:/DumpStack.log.tmp', // 문제 파일 제외
                ],
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: templatePath, // 올바른 경로로 수정
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_KEY': JSON.stringify(
                process.env.REACT_APP_API_KEY,
            ),
            'process.env.REACT_APP_TMDB_BASE_URL': JSON.stringify(
                process.env.REACT_APP_TMDB_BASE_URL,
            ),
            'process.env.REACT_APP_TMDB_POSTER_URL': JSON.stringify(
                process.env.REACT_APP_TMDB_POSTER_URL,
            ),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader',
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
        alias: {
            '@': path.resolve(__dirname, 'src'), // @를 src로 매핑
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};

export default config;
