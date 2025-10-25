import { getGmail } from "./google.js";

function base64urlEncode(str) {
  return Buffer.from(str, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sendThreadedReply({ to, from, fromName, replyTo, subject, htmlBody, threadId, inReplyTo, references }) {
  const gmail = await getGmail();

  const fromHdr = fromName ? `${fromName} <${from}>` : from;
  const replyToHdr = replyTo ? `Reply-To: ${replyTo}\r\n` : "";

  const raw = [
    `From: ${fromHdr}`,
    `To: ${to}`,
    `Subject: Re: ${subject}`,
    `In-Reply-To: ${inReplyTo}`,
    `References: ${references || inReplyTo}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    replyToHdr,
    ``,
    htmlBody
  ].join("\r\n");

  const encoded = base64urlEncode(raw);

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encoded,
      threadId
    }
  });

  return res.data;
}