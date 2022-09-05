const prod = process.env.NODE_ENV === "production";

export const backEndUrl = prod
  ? "http://api.sharethougths.online"
  : "http://localhost3065"; /// For Front
// export const backEndUrl = "http://localhost:3065";  /// For Dev
