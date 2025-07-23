/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://la-app.onrender.com/api/:path*', // Backend thật
            },
        ];
    },
};

export default nextConfig;