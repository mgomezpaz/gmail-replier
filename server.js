import express from 'express';
import { sendThreadedReply } from './lib/gmail.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const INTENT_MAP = {
  "Im%20in": "I'm in",
  "Tell%20me%20more": "Tell me more",
  "Not%20my%20vibe": "Not my vibe"
};

// Home page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Gmail Threaded Reply System</title>
      <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Gmail Threaded Reply System</h1>
      <p>This system enables threaded email replies through Gmail API integration.</p>
      
      <h2>How it works:</h2>
      <ol>
        <li>Send an email via Gmail API</li>
        <li>Generate CTA links with thread information</li>
        <li>Recipients click buttons to post threaded replies</li>
        <li>Replies appear in the original email thread</li>
      </ol>
      
      <h2>API Endpoint:</h2>
      <code>/api/reply</code>
      
      <p style="margin-top: 40px; color: #666;">
        Ready to use! Deploy to Vercel and start generating CTA links for your campaigns.
      </p>
    </body>
    </html>
  `);
});

// Thanks page
app.get('/thanks', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Thanks!</title>
      <style>
        body { 
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; 
          padding: 24px; 
          max-width: 600px; 
          margin: 0 auto; 
          text-align: center; 
        }
        h1 { color: #22c55e; margin-top: 0; }
        p { color: #666; }
      </style>
    </head>
    <body>
      <h1>✅ Thanks!</h1>
      <p style="font-size: 18px;">Your reply was posted to the original email thread.</p>
      <p style="color: #999; font-size: 14px;">You can close this tab now.</p>
    </body>
    </html>
  `);
});

// API endpoint for replies
app.get('/api/reply', async (req, res) => {
  try {
    const { intent, threadId, to, from, fromName, replyTo, subject, originalMessageId } = req.query;

    // Validate required parameters
    if (!intent || !INTENT_MAP[intent] || !threadId || !to || !from || !subject) {
      return res.status(400).json({ 
        error: "Missing required parameters: intent, threadId, to, from, subject" 
      });
    }

    const intentText = INTENT_MAP[intent];

    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;">
      <p>${escapeHtml(intentText)}</p>
      <p style="color:#6b7280;font-size:12px;">(Auto-posted via Campaign Sender Orchestrator)</p>
    </div>`;

    await sendThreadedReply({
      to: to,
      from: from,
      fromName: fromName || null,
      replyTo: replyTo || from,
      subject: subject,
      htmlBody: html,
      threadId: threadId,
      inReplyTo: originalMessageId || null,
      references: originalMessageId || null
    });

    // Redirect to confirmation
    const thanks = `${process.env.BASE_URL || `http://localhost:${PORT}`}/thanks`;
    return res.redirect(302, thanks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}

app.listen(PORT, () => {
  console.log(`🚀 Gmail Replier server running on port ${PORT}`);
  console.log(`📧 API endpoint: http://localhost:${PORT}/api/reply`);
  console.log(`✅ Thanks page: http://localhost:${PORT}/thanks`);
});