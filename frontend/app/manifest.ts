import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "School Management System",
    short_name: "SchoolMS",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "../public/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "../public/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
