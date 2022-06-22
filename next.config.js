const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      {
        source: '/servicess/:path',
        destination: '/',
        permanent: false
      }
    ]
  },
})
