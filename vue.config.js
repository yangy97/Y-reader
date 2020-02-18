module.exports = {
   
	publicPath: './',
	lintOnSave: false,
	devServer: {
	  // disableHostCheck: true,
	  proxy: {
	    '/api': {
	      target: 'http://api.zhuishushenqi.com',
	      ws: true,
	      changeOrigin: true,
	      pathRewrite: {
	        '^/api': ''
	      }
	    },
	    '/content': {
	      target: 'http://chapter2.zhuishushenqi.com',
	      changeOrigin: true,
	      ws: true,
	      pathRewrite: {
	        '^/content': ''
	      }
	    }
	  }
	},
	  
};