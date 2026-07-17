import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

function StatusPieChart({ data }) {
  if (!data?.applications_per_status) return null;

  const chartData = Object.entries(data.applications_per_status).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div style={{ width: "100%", height: 250, margin: "20px 0" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80} label>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;