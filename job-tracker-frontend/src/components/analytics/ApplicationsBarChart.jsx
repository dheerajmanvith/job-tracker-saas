import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function ApplicationsBarChart({ data }) {
  if (!data?.applications_per_week?.length) return null;

  return (
    <div style={{ width: "100%", height: 250, margin: "20px 0" }}>
      <ResponsiveContainer>
        <BarChart data={data.applications_per_week}>
          <XAxis dataKey="week" stroke="#ccc" />
          <YAxis stroke="#ccc" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ApplicationsBarChart;