/** @type {import('next').NextConfig} */
// const removeImports = require('next-remove-imports')();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports =withBundleAnalyzer({
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  }
})

// module.exports = removeImports({
//   reactStrictMode: true,
// })
