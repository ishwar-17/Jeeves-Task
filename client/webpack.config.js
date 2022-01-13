const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
	template: "./src/index.html",
	filename: "index.html"
});

module.exports = {
    entry: { 
        index: path.resolve(__dirname, "src", "index.js") 
    },
    resolve: {
		extensions: ['.js', '.jsx']
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "public/dist"),
        sourceMapFilename: 'bundle.map.js'
    },
    module: {
        rules: [
            {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
            },
            {
                test: /\.(eot|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
			}
        ]
    },
    devServer: {
		contentBase: path.join(__dirname, "public/dist"),
        compress: true,
        hot: true,
        inline: true,
        port: 8080,
        proxy: {
            '/api/*': {
                target: 'http://localhost:6000',
                secure: false
            }
        },
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
		htmlPlugin,
    ]
};