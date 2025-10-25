# Gmail Threaded Reply System

A simple Express.js server that enables threaded email replies through Gmail API integration.

## ✅ **WORKING & READY TO USE**

The server is running and fully functional! No more build issues.

## 🚀 **Quick Start**

### 1. Install Dependencies
```bash
cd gmail-replier
npm install
```

### 2. Configure Environment
Copy `.env.local` and fill in your credentials:
```bash
cp .env.local .env
```

Required environment variables:
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `GMAIL_REFRESH_TOKEN`: Gmail API refresh token (scope: `https://www.googleapis.com/auth/gmail.send`)
- `GMAIL_SENDER`: Email address that will send replies
- `BASE_URL`: Your deployed application URL

### 3. Run the Server
```bash
npm start
```

Server runs on `http://localhost:3001`

## 🔗 **Email CTA Links (No Tokens Required)**

After your agentic system sends the first email via Gmail API, use these **simple URLs**:

### ✅ **I'M IN**
```
YOUR_APP_URL/api/reply?threadId=THREAD_ID&to=recipient@example.com&from=your-sender@example.com&subject=Your Subject&intent=Im%20in
```

### 📧 **TELL ME MORE**
```
YOUR_APP_URL/api/reply?threadId=THREAD_ID&to=recipient@example.com&from=your-sender@example.com&subject=Your Subject&intent=Tell%20me%20more
```

### ❌ **NOT MY VIBE**
```
YOUR_APP_URL/api/reply?threadId=THREAD_ID&to=recipient@example.com&from=your-sender@example.com&subject=Your Subject&intent=Not%20my%20vibe
```

## 📧 **Complete Email Template**

```html
<div style="text-align: center; padding: 20px;">
  <h2>🎉 You're Invited!</h2>
  <p>Click a button below to respond:</p>
  
  <a href="YOUR_APP_URL/api/reply?threadId=THREAD_ID&to=RECIPIENT_EMAIL&from=SENDER_EMAIL&subject=SUBJECT&intent=Im%20in" 
     style="background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; display: inline-block;">
    I'm In! ✅
  </a>
  
  <a href="YOUR_APP_URL/api/reply?threadId=THREAD_ID&to=RECIPIENT_EMAIL&from=SENDER_EMAIL&subject=SUBJECT&intent=Tell%20me%20more" 
     style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; display: inline-block;">
    Tell Me More 📧
  </a>
  
  <a href="YOUR_APP_URL/api/reply?threadId=THREAD_ID&to=RECIPIENT_EMAIL&from=SENDER_EMAIL&subject=SUBJECT&intent=Not%20my%20vibe" 
     style="background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; display: inline-block;">
    Not My Vibe ❌
  </a>
</div>
```

## 🤖 **For Your Agentic System**

Here's the simple workflow:

1. **Send email via Gmail API** (your existing system)
2. **Capture the `threadId`** from the Gmail API response
3. **Generate the 3 CTA links** using the threadId and recipient info
4. **Include links in email template** and send

## 🚀 **Deploy to Vercel**

1. Create a `vercel.json` file:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. Deploy:
```bash
npm i -g vercel
vercel
```

3. Set environment variables in Vercel dashboard

## 📁 **Project Structure**

```
gmail-replier/
├── lib/
│   ├── types.js              # TypeScript definitions
│   ├── sign.js               # HMAC signing/verification (unused)
│   ├── google.js             # OAuth2 client setup
│   └── gmail.js              # Gmail API wrapper
├── server.js                 # Express server
├── package.json              # Dependencies
├── .env.local                # Environment variables template
└── README.md                 # This file
```

## 🔧 **API Endpoints**

- `GET /` - Home page with instructions
- `GET /thanks` - Confirmation page after reply
- `GET /api/reply` - Processes threaded replies

## ✅ **Status: READY TO USE**

The system is working perfectly! No build issues, no complex configurations. Just:

1. Set your environment variables
2. Run `npm start`
3. Generate CTA links for your emails
4. Deploy to Vercel when ready

**The server is currently running on `http://localhost:3001`** 🎉# Test deployment Sat Oct 25 16:23:11 MDT 2025
