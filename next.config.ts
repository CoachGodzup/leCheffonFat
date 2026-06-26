import { API_BASE, THE_MEAL_DB } from "@/service/meal-db-service";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        pathname: "/images/media/meals/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
