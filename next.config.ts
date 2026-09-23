import type { NextConfig } from "next";

const demo = process.env.NEXT_PUBLIC_DEMO === "1" || process.env.NEXT_PUBLIC_NOINDEX === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const base = [
      // The site can never be framed into someone else's page.
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
    ];
    const demoOnly = demo ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, noimageindex" }, { key: "Cache-Control", value: "private, no-store" }] : [];
    return [{ source: "/(.*)", headers: [...base, ...demoOnly] }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves qualities on this allowlist.
    qualities: [60, 75, 85, 90, 95],
  },
};

export default nextConfig;
