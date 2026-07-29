import { useEffect } from "react";
import useApplicationStore from "../store/applicationStore";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";


function Dashboard() {


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
        Dashboard
      </h1>


      <div className="bg-white rounded-xl shadow p-6">


        <h2 className="text-xl font-bold mb-4">
          Recent Applications
        </h2>



        <ApplicationTable
          applications={
            applications.slice(0,5)
          }
        />


      </div>


    </div>

  );
}


export default Dashboard;