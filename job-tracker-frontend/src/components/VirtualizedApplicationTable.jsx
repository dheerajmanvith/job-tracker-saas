import React from "react";
import { useTranslation } from "react-i18next";

function VirtualizedApplicationTable({ applications = [] }) {
  const { t } = useTranslation();

  const getStatusText = (status) => {
    switch (status?.toUpperCase()) {
      case "APPLIED":
        return t("applied");

      case "PHONE_SCREEN":
        return t("phone_screen");

      case "INTERVIEW":
        return t("interview");

      case "OFFER":
        return t("offer");

      case "REJECTED":
        return t("rejected");

      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        {t("recentApplications")}
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          {t("noApplications")}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left p-3">
                  {t("company")}
                </th>

                <th className="text-left p-3">
                  {t("position")}
                </th>

                <th className="text-left p-3">
                  {t("status")}
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
                        app.status?.toUpperCase() === "OFFER"
                          ? "bg-green-100 text-green-700"
                          : app.status?.toUpperCase() === "INTERVIEW"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status?.toUpperCase() === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {getStatusText(app.status)}
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