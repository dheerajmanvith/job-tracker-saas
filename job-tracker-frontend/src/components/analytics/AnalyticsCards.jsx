function AnalyticsCards({ data }) {
  if (!data) return null;

  const cards = [
    { label: "Total Applications", value: data.total_applications },
    { label: "Response Rate", value: `${data.response_rate}%` },
    { label: "Best Day to Apply", value: data.best_day_to_apply || "N/A" },
  ];

  return (
    <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
      {cards.map((c) => (
        <div key={c.label} style={{ background: "#1e1e2e", padding: "16px 24px", borderRadius: "8px" }}>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>{c.label}</div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;