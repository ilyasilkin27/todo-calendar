const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://isdayoff.ru',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    })
  );
};
