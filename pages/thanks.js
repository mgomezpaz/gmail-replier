export default function Thanks() {
  return (
    <div style={{ 
      padding: 24, 
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      maxWidth: 600,
      margin: "0 auto",
      textAlign: "center"
    }}>
      <h1 style={{ marginTop: 0, color: "#22c55e" }}>✅ Thanks!</h1>
      <p style={{ fontSize: 18, color: "#666" }}>
        Your reply was posted to the original email thread.
      </p>
      <p style={{ color: "#999", fontSize: 14 }}>
        You can close this tab now.
      </p>
    </div>
  );
}