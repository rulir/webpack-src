"use strict";

const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	entry: "./home",
	output: {
		filename: "bundle.js",
		library: "home"
	},

	watch: NODE_ENV == 'development',

	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		})
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}]
	}
};

if (NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
}