import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  /* config options here */
  images: {
    domains: [
      "www.placehold.co",
      "www.via.placeholder.com",
      "www.istudio.store",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
