const prod = process.env.NODE_ENV === "production";

export const backEndUrl = prod
  ? "http://api.sharethoughts.online" // For Production
  : "http://localhost3065"; /// For Development
