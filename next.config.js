/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
    ALCHEMY_API_KEY_MAINNET: process.env.ALCHEMY_API_KEY_MAINNET,
    LIGHTHOUSE_API_KEY: process.env.LIGHTHOUSE_API_KEY,
    LIGHTHOUSE_API_KEY_DEPOT: process.env.LIGHTHOUSE_API_KEY_DEPOT,
  },
  // Enable CSS modules for all files
  cssModules: true,
  // Enable CSS modules for files with the .module.css extension
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      mode: "local",
      localIdentName: "[name]__[local]--[hash:base64:5]",
      // Enable CSS modules only for files with the .module.css extension
      test: /\.module\.css$/,
    },
  },
}

module.exports = nextConfig
