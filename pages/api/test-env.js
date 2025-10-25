export default function handler(req, res) {
  const env = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set',
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN ? 'Set' : 'Not set',
    GMAIL_SENDER: process.env.GMAIL_SENDER || 'Not set',
    HMAC_SECRET: process.env.HMAC_SECRET ? 'Set' : 'Not set',
    BASE_URL: process.env.BASE_URL || 'Not set'
  };
  
  res.status(200).json(env);
}
