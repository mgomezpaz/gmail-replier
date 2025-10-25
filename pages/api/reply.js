import { sendThreadedReply } from "../../lib/gmail.js";
import { verifyToken } from "../../lib/sign.js";

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
    const { intent, token, threadId, to, from, fromName, replyTo, subject, originalMessageId } = req.query;

    let payload = null;
    
    // Check if we have a token (preferred method)
    if (token) {
      payload = verifyToken(token);
      if (!payload) {
        return res.status(400).json({ error: "Invalid token" });
      }
    }

    // Use token data if available, otherwise use direct parameters
    const finalIntent = intent;
    const finalThreadId = payload?.threadId || threadId;
    const finalTo = payload?.to || to;
    const finalFrom = payload?.from || from;
    const finalFromName = payload?.fromName || fromName;
    const finalReplyTo = payload?.replyTo || replyTo;
    const finalSubject = payload?.subject || subject;
    const finalOriginalMessageId = payload?.originalMessageId || originalMessageId;

    // Validate required parameters
    if (!finalIntent || !INTENT_MAP[finalIntent] || !finalThreadId || !finalTo || !finalFrom || !finalSubject) {
      return res.status(400).json({ 
        error: "Missing required parameters: intent, threadId, to, from, subject",
        received: { intent: finalIntent, threadId: finalThreadId, to: finalTo, from: finalFrom, subject: finalSubject }
      });
    }

    const intentText = INTENT_MAP[finalIntent];

    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;">
      <p>${escapeHtml(intentText)}</p>
      <p style="color:#6b7280;font-size:12px;">(Auto-posted via Campaign Sender Orchestrator)</p>
    </div>`;

    await sendThreadedReply({
      to: finalTo,
      from: finalFrom,
      fromName: finalFromName || null,
      replyTo: finalReplyTo || finalFrom,
      subject: finalSubject,
      htmlBody: html,
      threadId: finalThreadId,
      inReplyTo: finalOriginalMessageId || null,
      references: finalOriginalMessageId || null
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