import crypto from "crypto";

const SECRET = process.env.HMAC_SECRET || "";

const base64url = (buf) => buf.toString("base64url");
const fromBase64url = (str) => Buffer.from(str, "base64url");

export function signPayload(payload) {
  const json = JSON.stringify(payload);
  const data = base64url(Buffer.from(json, "utf8"));
  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyToken(token) {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
    const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!ok) return null;
    const json = fromBase64url(data).toString("utf8");
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}