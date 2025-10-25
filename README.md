# Gmail Threaded Reply System

A Next.js application that enables threaded email replies through signed tokens and Gmail API integration.

## Features

- **HMAC Token Signing**: Secure token-based authentication for reply actions
- **Gmail OAuth Integration**: Uses refresh tokens for Gmail API access
- **Threaded Replies**: Posts replies directly to original email threads
- **Multiple Intent Support**: Pre-defined reply options (I'm in, Tell me more, Not my vibe)
- **PII-Safe**: No sensitive data stored in URLs

## Quick Start

### 1. Install Dependencies

```bash
cd gmail-replier
npm install
```

### 2. Environment Setup

Copy `.env.local` and fill in your credentials:

```bash
cp .env.local .env.local
```

Required environment variables:
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `GMAIL_REFRESH_TOKEN`: Gmail API refresh token (scope: `https://www.googleapis.com/auth/gmail.send`)
- `HMAC_SECRET`: Long random secret for token signing
- `GMAIL_SENDER`: Email address that will send replies
- `BASE_URL`: Your deployed application URL

### 3. Get Gmail Refresh Token

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Use the OAuth playground to get a refresh token:
   - Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
   - Select Gmail API v1
   - Select scope: `https://www.googleapis.com/auth/gmail.send`
   - Authorize and get refresh token

### 4. Development

```bash
npm run dev
```

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## Usage

### Generating CTA Links

After sending your initial campaign email via Gmail API, capture the `threadId` and `originalMessageId`, then generate signed tokens:

```javascript
import { signPayload } from "./lib/sign.js";

const payload = {
  threadId: "THREAD_ID_FROM_GMAIL",
  originalMessageId: "<ABC123@example.com>",
  to: "recipient@example.com",
  from: process.env.GMAIL_SENDER,
  fromName: "Your Brand",
  replyTo: process.env.GMAIL_SENDER,
  subject: "Your Subject Here"
};

const token = signPayload(payload);

const base = process.env.BASE_URL || "https://your-vercel-app.vercel.app";
const yes = `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Im%20in`;
const more = `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Tell%20me%20more`;
const no = `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Not%20my%20vibe`;
```

### Email Template Example

```html
<div style="text-align: center; padding: 20px;">
  <h2>Join Our Event!</h2>
  <p>Click one of the buttons below to respond:</p>
  
  <a href="YOUR_YES_URL" 
     style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 8px;">
    I'm In! ✅
  </a>
  
  <a href="YOUR_MORE_URL" 
     style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 8px;">
    Tell Me More 📧
  </a>
  
  <a href="YOUR_NO_URL" 
     style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 8px;">
    Not My Vibe ❌
  </a>
</div>
```

## API Endpoints

### `GET /api/reply`

Handles threaded reply posting.

**Query Parameters:**
- `token`: HMAC-signed payload containing thread and message info
- `intent`: Reply intent (`Im%20in`, `Tell%20me%20more`, `Not%20my%20vibe`)

**Response:**
- Success: Redirects to `/thanks`
- Error: JSON error response

## Security Features

- **HMAC-SHA256 Signing**: All tokens are cryptographically signed
- **Timing-Safe Comparison**: Prevents timing attacks during verification
- **No PII Storage**: Sensitive data only in signed tokens
- **HTTPS Required**: Vercel provides HTTPS by default

## File Structure

```
gmail-replier/
├── app/
│   ├── api/reply/
│   │   └── route.js          # API handler for replies
│   └── thanks/
│       └── page.js           # Confirmation page
├── lib/
│   ├── types.js              # TypeScript definitions
│   ├── sign.js               # HMAC signing/verification
│   ├── google.js             # OAuth2 client setup
│   └── gmail.js              # Gmail API wrapper
├── package.json
├── .env.local                # Environment variables
└── README.md
```

## Troubleshooting

### Common Issues

1. **Invalid Token Error**
   - Check `HMAC_SECRET` is set correctly
   - Ensure token hasn't been tampered with
   - Verify token format: `data.signature`

2. **Gmail API Errors**
   - Verify refresh token is valid
   - Check OAuth scopes include `gmail.send`
   - Ensure sender email is authorized

3. **Thread Not Found**
   - Verify `threadId` is correct
   - Check if thread still exists in Gmail
   - Ensure original message ID is valid

### Debug Mode

Add logging to see token payloads:

```javascript
// In route.js
console.log('Token payload:', payload);
console.log('Intent:', intentParam);
```

## License

MIT