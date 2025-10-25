import { google } from "googleapis";

export function getOAuth2Client() {
  const oAuth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  });
  oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  return oAuth2Client;
}

export async function getGmail() {
  const auth = getOAuth2Client();
  return google.gmail({ version: "v1", auth });
}