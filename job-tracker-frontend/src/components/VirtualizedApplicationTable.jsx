import React from "react";

function VirtualizedApplicationTable({ applications = [] }) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Recent Applications
      </h2>


      {applications.length === 0 ? (

        <p className="text-gray-500">
          No applications found.
        </p>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="border-b bg-gray-100">

                <th className="text-left p-3">
                  Company
                </th>

                <th className="text-left p-3">
                  Role
                </th>

                <th className="text-left p-3">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {applications.map((app) => (

                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {app.company}
                  </td>


                  <td className="p-3">
                    {app.role}
                  </td>


                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        
                        app.status === "Offer"
                          ? "bg-green-100 text-green-700"

                          : app.status === "Interview"
                          ? "bg-yellow-100 text-yellow-700"

                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"

                          : "bg-blue-100 text-blue-700"

                      }`}
                    >

                      {app.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}


export default VirtualizedApplicationTable;