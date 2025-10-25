#!/usr/bin/env node
/**
 * Generate CTA links for email campaigns
 * Usage: node generate-email-links.js
 */

import { signPayload } from "./lib/sign.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Example: Replace these with your actual campaign data
const campaignData = {
  threadId: "THREAD_ID_FROM_GMAIL", // Get this from Gmail API send response
  originalMessageId: "<ABC123@example.com>", // Message-ID from original email headers
  to: "recipient@example.com",
  from: process.env.GMAIL_SENDER,
  fromName: "Otishi", // Your brand name
  replyTo: process.env.GMAIL_SENDER,
  subject: "Join Our Exclusive Event!"
};

function generateEmailLinks(campaignData) {
  // Sign the payload to create a secure token
  const token = signPayload(campaignData);
  
  // Your deployed app URL
  const base = process.env.BASE_URL || "https://your-vercel-app.vercel.app";
  
  // Generate the three CTA URLs
  const links = {
    yes: `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Im%20in`,
    more: `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Tell%20me%20more`,
    no: `${base}/api/reply?token=${encodeURIComponent(token)}&intent=Not%20my%20vibe`
  };
  
  return links;
}

// Generate links
const links = generateEmailLinks(campaignData);

console.log("🔗 Generated CTA Links for Your Email:");
console.log("=" * 50);
console.log("\n✅ I'M IN:");
console.log(links.yes);
console.log("\n📧 TELL ME MORE:");
console.log(links.more);
console.log("\n❌ NOT MY VIBE:");
console.log(links.no);

console.log("\n" + "=" * 50);
console.log("📧 Email Template HTML:");
console.log("=" * 50);

const emailHTML = `
<div style="text-align: center; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">🎉 You're Invited to Our Exclusive Event!</h2>
  <p style="color: #666; font-size: 16px;">We'd love to have you join us for an amazing experience.</p>
  
  <div style="margin: 30px 0;">
    <a href="${links.yes}" 
       style="background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; display: inline-block; font-weight: bold;">
      I'm In! ✅
    </a>
    
    <a href="${links.more}" 
       style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; display: inline-block; font-weight: bold;">
      Tell Me More 📧
    </a>
    
    <a href="${links.no}" 
       style="background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 10px; display: inline-block; font-weight: bold;">
      Not My Vibe ❌
    </a>
  </div>
  
  <p style="color: #999; font-size: 12px; margin-top: 20px;">
    Clicking any button will post your response directly to this email thread.
  </p>
</div>
`;

console.log(emailHTML);

console.log("\n" + "=" * 50);
console.log("📝 Instructions:");
console.log("=" * 50);
console.log("1. Replace the example data in this script with your actual campaign data");
console.log("2. Run: node generate-email-links.js");
console.log("3. Copy the generated links into your email template");
console.log("4. Send your campaign via Gmail API");
console.log("5. When recipients click buttons, replies will be posted to the original thread");