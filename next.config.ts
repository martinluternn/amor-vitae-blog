import type { NextConfig } from "next";
const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    nonce,
    DEFAULT_TIME_ZONE: "Asia/Jakarta",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: `base-uri 'self'; default-src 'self'; script-src 'self' 'unsafe-inline' '${
              process.env.NODE_ENV == "development" ? "unsafe-eval" : ""
            }' w3.org *.w3.org jsonplaceholder.typicode.com cdn.jsdelivr.net *.googletagmanager.com; child-src 'self'; style-src 'self' 'unsafe-inline' w3.org *.w3.org jsonplaceholder.typicode.com cdn.jsdelivr.net; font-src 'self' data:; connect-src 'self' w3.org *.w3.org jsonplaceholder.typicode.com cdn.jsdelivr.net *.googletagmanager.com *.google-analytics.com; frame-src 'self'; img-src 'self' data: ;`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value:
              'fullscreen=(self "https://jsonplaceholder.typicode.com"), geolocation=*, camera=()',
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Powered-By",
            value: "Martin - Developer",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jsonplaceholder.typicode.com",
      },
      {
        protocol: "http",
        hostname: "jsonplaceholder.typicode.com",
      },
    ],
  },
};

export default nextConfig;
