import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/sign.js";
import { sendThreadedReply } from "@/lib/gmail.js";

const INTENT_MAP = {
  "Im%20in": "I'm in",
  "Tell%20me%20more": "Tell me more",
  "Not%20my%20vibe": "Not my vibe"
};

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const intentParam = url.searchParams.get("intent");

    if (!token || !intentParam || !INTENT_MAP[intentParam]) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    const intentText = INTENT_MAP[intentParam];

    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;">
      <p>${escapeHtml(intentText)}</p>
      <p style="color:#6b7280;font-size:12px;">(Auto-posted via Campaign Sender Orchestrator)</p>
    </div>`;

    await sendThreadedReply({
      to: payload.to,
      from: payload.from,
      fromName: payload.fromName,
      replyTo: payload.replyTo,
      subject: payload.subject,
      htmlBody: html,
      threadId: payload.threadId,
      inReplyTo: payload.originalMessageId,
      references: payload.originalMessageId
    });

    // Redirect to confirmation
    const thanks = `${process.env.BASE_URL || ""}/thanks`;
    return NextResponse.redirect(thanks);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}