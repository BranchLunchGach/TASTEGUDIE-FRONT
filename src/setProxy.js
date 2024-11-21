const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/back", {
            target: process.env.REACT_APP_SPRING_IP,
            changeOrigin: true,
        })
    );

    app.use(
        '/v1',
        createProxyMiddleware({
            target: 'https://openapi.naver.com',
            changeOrigin: true,
            pathRewrite: {
                '^/v1': '/v1', // '/v1' 경로는 유지
            },
        })
    );
}