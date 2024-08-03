/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Logo for coins comes from this Domain
            {
                protocol: 'https',
                hostname: 'lcw.nyc3.cdn.digitaloceanspaces.com',
                port: '',
                pathname: '/production/**',
            },
        ],
    },
};

module.exports = nextConfig;