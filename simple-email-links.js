// Simple email link generator - NO TOKENS REQUIRED
// Just include these URLs in your email after sending via Gmail API

function generateSimpleEmailLinks(campaignData) {
  const {
    threadId,
    originalMessageId,
    to,
    from,
    fromName,
    replyTo,
    subject,
    baseUrl
  } = campaignData;

  // URL encode the parameters
  const params = new URLSearchParams({
    threadId,
    to,
    from,
    subject,
    ...(fromName && { fromName }),
    ...(replyTo && { replyTo }),
    ...(originalMessageId && { originalMessageId })
  });

  const base = baseUrl || process.env.BASE_URL || "https://your-vercel-app.vercel.app";
  
  return {
    yes: `${base}/api/reply?${params.toString()}&intent=Im%20in`,
    more: `${base}/api/reply?${params.toString()}&intent=Tell%20me%20more`,
    no: `${base}/api/reply?${params.toString()}&intent=Not%20my%20vibe`
  };
}

// Example usage - replace with your actual campaign data
const campaignData = {
  threadId: "YOUR_THREAD_ID_HERE", // From Gmail API send response
  originalMessageId: "<YOUR_MESSAGE_ID_HERE>", // From email headers (optional)
  to: "recipient@example.com",
  from: "your-sender@example.com",
  fromName: "Your Brand", // Optional
  replyTo: "your-sender@example.com", // Optional
  subject: "Your Email Subject",
  baseUrl: "https://your-vercel-app.vercel.app"
};

const links = generateSimpleEmailLinks(campaignData);

console.log("🔗 Simple Email CTA Links (NO TOKENS):");
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
console.log("📝 Instructions for Your Agentic System:");
console.log("=" * 50);
console.log("1. Send your email via Gmail API");
console.log("2. Capture the threadId from the response");
console.log("3. Use this script to generate the 3 CTA links");
console.log("4. Include the links in your email template");
console.log("5. Send the email with the CTA buttons");
console.log("6. When recipients click, replies will be posted to the thread");