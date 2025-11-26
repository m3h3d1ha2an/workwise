type CookieDuration = {
  maxAge: number;     // seconds
  expires: Date;      // absolute expiration time
};

export const parseExpiresIn = (value: string): CookieDuration => {
  const v = value.trim().toLowerCase();

  // number part
  const num = parseFloat(v);
  if (Number.isNaN(num)) throw new Error("Invalid expiresIn: missing number");

  let ms: number;

  // YEARS
  if (v.includes("year") || v.endsWith("y")) {
    ms = num * 365 * 24 * 60 * 60 * 1000;
  }
  // WEEKS
  else if (v.includes("week") || v.endsWith("w")) {
    ms = num * 7 * 24 * 60 * 60 * 1000;
  }
  // DAYS
  else if (v.includes("day") || v.endsWith("d")) {
    ms = num * 24 * 60 * 60 * 1000;
  }
  // HOURS
  else if (v.includes("hour") || v.endsWith("h")) {
    ms = num * 60 * 60 * 1000;
  }
  // MINUTES
  else if (v.includes("min") || v.endsWith("m")) {
    // careful: "ms" must not match "m"
    if (v.endsWith("ms")) {
      ms = num;
    } else {
      ms = num * 60 * 1000;
    }
  }
  // SECONDS
  else if (v.includes("sec") || v.endsWith("s")) {
    ms = num * 1000;
  }
  // MILLISECONDS (explicit "ms")
  else if (v.endsWith("ms")) {
    ms = num;
  }
  else {
    throw new Error("Unsupported expiresIn format");
  }

  return {
    maxAge: Math.floor(ms / 1000),
    expires: new Date(Date.now() + ms)
  };
}
