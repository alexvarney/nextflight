const withTwin = require("./with-twin.js");
/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: true,
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/airport",
        permanent: false,
      },
    ];
  },
});
