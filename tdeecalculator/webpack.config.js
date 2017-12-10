var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
	context: __dirname,
	
	entry: './static/js/index',

	output: {
		path: path.resolve('./static/bundles/'),
		filename: '[name]-[hash].js',
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.json'}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader:'babel-loader',
						query: {
							presets: ['react']
						}
					}
				],
				
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},
	resolveLoader: {
		modules: ['node_modules'],
	}
}