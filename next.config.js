/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
    ALCHEMY_API_KEY_MAINNET: process.env.ALCHEMY_API_KEY_MAINNET,
  }
}

module.exports = nextConfig
