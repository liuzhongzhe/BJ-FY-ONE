'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
	dev: {

		// Paths
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: { 
			'/patac_tse': {
				target: 'http://192.168.60.203/patac_tse',
				changeOrigin: true,
				pathRewrite: {
					'^/patac_tse': ''
				}
			},
			'/api': {
				target: 'http://192.168.100.203:8080/portal/api',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/patac_ras': {
				target: 'http://39.107.243.101:7070',
				changeOrigin: true,
				pathRewrite: {
					'^/patac_ras': ''
				}
			},
// 			'/proinfo': {
// 				target: 'http://39.107.243.101:7070/proinfo',
// 				changeOrigin: true,
// 				pathRewrite: {
// 					'^/proinfo': ''
// 				}
// 			},
			'/bpData': {
				target: 'http://39.107.243.101:7070/bpData',
				changeOrigin: true,
				pathRewrite: {
					'^/bpData': ''
				}
			},
			'/material': {
				target: 'http://39.107.243.101:7070/material',
				changeOrigin: true,
				pathRewrite: {
					'^/material': ''
				}
			},
			'/tppData': {
				target: 'http://39.107.243.101:7070/tppData',
				changeOrigin: true,
				pathRewrite: {
					'^/tppData': ''
				}
			},
			'/carpettemp': {
				target: 'http://39.107.243.101:7070/carpettemp',
				changeOrigin: true,
				pathRewrite: {
					'^/carpettemp': ''
				}
			},
			
			
		},

		// Various Dev Server settings
		host: '0.0.0.0'||'localhost',
		port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		autoOpenBrowser: false,
		errorOverlay: true,
		notifyOnErrors: true,
		poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

		/**
		 * Source Maps
		 */

		 
		// https://webpack.js.org/configuration/devtool/#development
		devtool: 'cheap-module-eval-source-map',

		// If you have problems debugging vue-files in devtools,
		// set this to false - it *may* help
		// https://vue-loader.vuejs.org/en/options.html#cachebusting
		cacheBusting: true,

		cssSourceMap: true
	},

	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: './',

		/**
		 * Source Maps
		 */

		productionSourceMap: true,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: '#source-map',

		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],

		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	}
}