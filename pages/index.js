export default function Home() {
  return (
    <div style={{ 
      padding: 24, 
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      maxWidth: 800,
      margin: "0 auto"
    }}>
      <h1>Gmail Threaded Reply System</h1>
      <p>This system enables threaded email replies through signed tokens and Gmail API integration.</p>
      
      <h2>How it works:</h2>
      <ol>
        <li>Send an email via Gmail API</li>
        <li>Generate CTA links with thread information</li>
        <li>Recipients click buttons to post threaded replies</li>
        <li>Replies appear in the original email thread</li>
      </ol>
      
      <h2>API Endpoint:</h2>
      <code>/api/reply</code>
      
      <p style={{ marginTop: 40, color: "#666" }}>
        Ready to use! Deploy to Vercel and start generating CTA links for your campaigns.
      </p>
    </div>
  )
}