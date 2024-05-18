/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        API_BASE_URL: process.env.API_BASE_URL,
        API_PUBLIC_KEY: process.env.API_PUBLIC_KEY,
        API_PRIVATE_KEY: process.env.API_PRIVATE_KEY
    }
};

export default nextConfig;
