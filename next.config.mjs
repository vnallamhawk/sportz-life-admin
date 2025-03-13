/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

import withImages from "next-images";

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  images: {
    disableStaticImages: true,
  },
  // @ts-ignore
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        include: /src\/app\/assets\/images/,
        use: ["url-loader"],
      },
      {
        test: /\.svg$/,
        include: /src\/app\/assets\/icons/,
        use: ["@svgr/webpack"],
      }
    );
    return config;
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/edit-coach-:id",
        destination: "/coach/AddCoach",
      },
      {
        source: "/edit-center-:id",
        destination: "/centers/AddCenter",
      },
      {
        source: "/edit-athlete-:id",
        destination: "/athlete/AddAthlete",
      },
      {
        source: "/edit-staffPayroll-:id",
        destination: "/staffPayroll/AddPayroll",
      },
      {
        source: "/edit-staff-:id",
        destination: "/staff/AddStaff",
      },
      {
        source: "/edit-plan-:id",
        destination: "/pricing/AddPlans?search=Fee+Plan", // FIXED
      },
    ];
  },
});

export default nextConfig;
