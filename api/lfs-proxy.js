const { createProxyMiddleware } = require('http-proxy-middleware');

const lfsProxy = createProxyMiddleware({
  target: 'https://media.githubusercontent.com/media/unitof/vercel-git-lfs-test/main/',
  pathRewrite: {
    '^/api/lfs-proxy': ''
  },
  changeOrigin: true
})

module.exports = (req, res) => {
  lfsProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result
    }
    throw new Error(`Proxy error with url: '${req.url}'`);
  })
}
