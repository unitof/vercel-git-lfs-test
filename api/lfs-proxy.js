const { createProxyMiddleware } = require('http-proxy-middleware');

const lfsProxy = createProxyMiddleware({
  target: 'https://media.githubusercontent.com/media/unitof/vercel-git-lfs-test/main/',
  pathRewrite: {
    '^/api/lfs-proxy': ''
  },
  changeOrigin: true
})

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=600, stale-while-revalidate')
  lfsProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result
    }
    throw new Error(`Proxy error with url: '${req.url}'`);
  })
}
