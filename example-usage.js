// Example: How to generate CTA links for your email campaigns
// This file shows how to use the Gmail replier system

import { signPayload } from "./lib/sign.js";

// Example payload - replace with your actual data
const payload = {
  threadId: "THREAD_ID_FROM_GMAIL", // Get this from Gmail API send response
  originalMessageId: "<ABC123@example.com>", // Message-ID from original email
  to: "recipient@example.com",
  from: process.env.GMAIL_SENDER,
  fromName: "Otishi", // Your brand name
  replyTo: process.env.GMAIL_SENDER,
  subject: "Join Our Exclusive Event!"
};

// Sign the payload to create a secure token
const token = signPayload(payload);

// Generate the three CTA URLs
const base = process.env.BASE_URL || "https://your-vercel-app.vercel.app";
const yes = `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Im%20in`;
const more = `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Tell%20me%20more`;
const no = `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Not%20my%20vibe`;

console.log("Generated CTA URLs:");
console.log("I'm In:", yes);
console.log("Tell Me More:", more);
console.log("Not My Vibe:", no);

// Example HTML for email template
const emailTemplate = `
<div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
  <h2>🎉 You're Invited to Our Exclusive Event!</h2>
  <p>We'd love to have you join us for an amazing experience.</p>
  
  <div style="margin: 20px 0;">
    <a href="${yes}" 
       style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 8px; display: inline-block;">
      I'm In! ✅
    </a>
    
    <a href="${more}" 
       style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 8px; display: inline-block;">
      Tell Me More 📧
    </a>
    
    <a href="${no}" 
       style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 8px; display: inline-block;">
      Not My Vibe ❌
    </a>
  </div>
  
  <p style="color: #666; font-size: 12px;">
    Clicking any button will post your response directly to this email thread.
  </p>
</div>
`;

console.log("\nEmail Template HTML:");
console.log(emailTemplate);