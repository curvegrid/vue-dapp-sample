const instanceURL = 'https://octo4.dev.decrypt.multibaas.com/';

module.exports = {
  devServer: {
    https: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '/': {
        ws: false,
        target: instanceURL,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        onProxyReq: (proxyReq) => {
          // Browers may send Origin headers even with same-origin
          // requests. To prevent CORS issues, we have to change
          // the Origin to match the target URL.
          if (proxyReq.getHeader('origin')) {
            proxyReq.setHeader('origin', instanceURL);
          }
        },
      },
    },
  },
};
