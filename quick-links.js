// Quick script to generate email CTA links
// Replace the example data with your actual campaign data

const campaignData = {
  threadId: "YOUR_THREAD_ID_HERE", // From Gmail API send response
  originalMessageId: "<YOUR_MESSAGE_ID_HERE>", // From email headers
  to: "recipient@example.com",
  from: "your-sender@example.com",
  fromName: "Your Brand",
  replyTo: "your-sender@example.com",
  subject: "Your Email Subject"
};

// Your deployed app URL
const baseUrl = "https://your-vercel-app.vercel.app";

// Generate token (you'll need to implement signPayload)
// const token = signPayload(campaignData);

// The three links you need to include in your email:
console.log("🔗 Include these 3 links in your email:");
console.log("");
console.log("✅ I'M IN:");
console.log(`${baseUrl}/api/reply?token=TOKEN_HERE&intent=Im%20in`);
console.log("");
console.log("📧 TELL ME MORE:");
console.log(`${baseUrl}/api/reply?token=TOKEN_HERE&intent=Tell%20me%20more`);
console.log("");
console.log("❌ NOT MY VIBE:");
console.log(`${baseUrl}/api/reply?token=TOKEN_HERE&intent=Not%20my%20vibe`);