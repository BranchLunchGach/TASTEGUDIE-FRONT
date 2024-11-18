const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api/v1", {
            target: process.env.REACT_APP_SPRING_IP,
            changeOrigin: true,
        })
    )
}