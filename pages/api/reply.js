import { sendThreadedReply } from "../../lib/gmail.js";

const INTENT_MAP = {
  "Im%20in": "I'm in",
  "Tell%20me%20more": "Tell me more",
  "Not%20my%20vibe": "Not my vibe"
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    const thanks = `${process.env.BASE_URL || ""}/thanks`;
    return res.redirect(302, thanks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}