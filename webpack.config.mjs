import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

// __dirname 대체 방법
const __dirname = path.dirname(new URL(import.meta.url).pathname);

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
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_KEY': JSON.stringify(
                process.env.REACT_APP_API_KEY,
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
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};

export default config;
