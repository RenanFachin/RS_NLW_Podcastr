/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Liberando o next/image a buscar imagens deste servidor
    domains: ['storage.googleapis.com']
  }
}

module.exports = nextConfig
