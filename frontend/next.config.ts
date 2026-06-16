import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY:"BDlBURGScka647bPisT7F-VWhhyIREe2sYG6RJ-tl3276XmLyIERTwL0fOdCwersu1OQ5mgE89HX5VGhmrLbew8",
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
