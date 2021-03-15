module.exports = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/api'
            },
            {
                source: '/:path*',
                destination: '/api/:path*' // Proxy to Backend
            }
        ]
    },
}
