const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const appProxy = createProxyMiddleware('/api', {
        target: 'https://s32noa8osf.execute-api.us-east-1.amazonaws.com/stage_1/ai',
        changeOrigin: true,
        secure: false,
    });

    app.use(appProxy);
};
