module.exports = {
  devServer: {
    https: true,
    proxy: {
      '/': {
        target: 'https://octo4.rink.decrypt.multibaas.com/',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        onProxyReq: (proxyReq) => {
          // Browers may send Origin headers even with same-origin
          // requests. To prevent CORS issues, we have to change
          // the Origin to match the target URL.
          if (proxyReq.getHeader('origin')) {
            proxyReq.setHeader('origin', 'https://octo4.rink.decrypt.multibaas.com/');
          }
        },
      },
    },
  },
};
