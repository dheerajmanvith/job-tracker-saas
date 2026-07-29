import { useEffect } from "react";
import useApplicationStore from "../store/applicationStore";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

function Applications() {

  const applications =
    useApplicationStore(
      (state) => state.applications
    );

  const fetchApplications =
    useApplicationStore(
      (state) => state.fetchApplications
    );

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Applications
      </h1>


      <ApplicationTable
        applications={applications}
      />


    </div>
  );
}


export default Applications;