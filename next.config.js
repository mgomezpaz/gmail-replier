/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
}

export default nextConfig