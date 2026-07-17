function AnalyticsSkeleton() {
  const box = { background: "#2a2a3a", borderRadius: "8px", animation: "pulse 1.5s infinite" };
  return (
    <div style={{ padding: "20px", color: "white" }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      <div style={{ ...box, height: "24px", width: "200px", marginBottom: "16px" }} />
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <div style={{ ...box, height: "70px", width: "180px" }} />
        <div style={{ ...box, height: "70px", width: "180px" }} />
        <div style={{ ...box, height: "70px", width: "180px" }} />
      </div>
      <div style={{ ...box, height: "250px", width: "100%", marginBottom: "20px" }} />
      <div style={{ ...box, height: "250px", width: "100%" }} />
    </div>
  );
}
export default AnalyticsSkeleton;