const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV;

function getDevToolByEnv() {
	switch (mode) {
		case 'development':
			return 'inline-source-map';

		case 'production':
			return 'source-map';

		default:
			return 'eval-source-map';
	}
}

const config = {
	mode,
	entry: path.resolve(__dirname, 'src/app/index.js'),

	output: {
		path: path.resolve(__dirname, 'dist'), // Folder to store generated bundle
		filename: 'bundle.js', // Name of generated bundle after build
		publicPath: '/', // public URL of the output directory when referenced in a browser
	},

	devtool: getDevToolByEnv(),

	module: {
		// where we defined file patterns and their loaders
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				// Apply rule for .sass, .scss or .css files
				test: /\.(sa|sc|c)ss$/,

				// Set loaders to transform files.
				// Loaders are applying from right to left(!)
				// The first loader will be applied after others
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						// This loader resolves url() and @imports inside CSS
						loader: 'css-loader',
					},
					{
						// Then we apply postCSS fixes like autoprefixer and minifying
						loader: 'postcss-loader',
					},
					{
						// First we transform SASS to standard CSS
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
						},
					},
				],
			},
			{
				// Now we apply rule for images
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						// Using file-loader for these files
						loader: 'file-loader',

						// In options we can set different things like format
						// and directory to save
						options: {
							outputPath: 'images',
						},
					},
				],
			},
		],
	},

	plugins: [
		// Array of plugins to apply to build chunk
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/public/index.html'),
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
			Assets: path.resolve(__dirname, 'src/assets/'),
			App: path.resolve(__dirname, 'src/app/'),
			Utils: path.resolve(__dirname, 'src/utils/'),
		},
	},
};

if (mode === 'development') {
	config.devServer = {
		// configuration for webpack-dev-server
		contentBase: path.resolve(__dirname, 'src/public'), //source of static assets
		port: 7000, // port to run dev-server
	};

	config.plugins.push(new DashboardPlugin());
}

if (mode === 'production') {
	config.plugins.push(
		new UglifyJsPlugin() // minify the chunk
	);
}

module.exports = config;
