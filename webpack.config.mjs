import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

// __dirname 대체 방법
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'), // __dirname을 대체한 코드
        filename: isProduction ? '[name].[contenthash].js' : '[name].js', // 청크마다 고유한 이름 설정
        clean: true, // 빌드 전 dist 폴더를 깨끗하게 비움
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'public'),
            watch: {
                ignored: ['C:/DumpStack.log.tmp', /node_modules/], // 파일을 무시하도록 수정
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'), // 템플릿 경로 절대 경로로 수정
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_KEY': JSON.stringify(
                process.env.REACT_APP_API_KEY,
            ),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
            chunks: 'all', // 모든 청크를 분리
        },
    },
};

export default config;
