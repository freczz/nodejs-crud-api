const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = (env, argv) => {
    const mode = argv.mode || "development";
    return {
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist/'),
        },
        mode,
        plugins: [new CleanWebpackPlugin()],
        target: "node",
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/i,
                    loader: 'ts-loader',
                    exclude: ['/node_modules/'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
    }
};

module.exports = config;
