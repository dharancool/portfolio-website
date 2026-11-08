/** @type {import('next').NextConfig} */
const nextConfig = {
  // Plain static HTML in /out, served by Netlify. No server needed.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default nextConfig
