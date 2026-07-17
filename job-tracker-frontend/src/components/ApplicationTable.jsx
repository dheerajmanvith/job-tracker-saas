function ApplicationTable({ applications }) {
  if (applications.length === 0) {
    return (
      <p className="text-gray-500">
        No applications found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Company</th>
            <th className="border p-3 text-left">Role</th>
            <th className="border p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="border p-3">
                {app.company}
              </td>

              <td className="border p-3">
                {app.role}
              </td>

              <td className="border p-3">
                {app.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;