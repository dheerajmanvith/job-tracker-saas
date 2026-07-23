import { CSVLink } from "react-csv";


function ExportButton({ applications }) {

  const headers = [
    { 
      label: "Company", 
      key: "company" 
    },
    { 
      label: "Role", 
      key: "role" 
    },
    { 
      label: "Status", 
      key: "status" 
    },
  ];


  return (

    <div className="mb-4 flex justify-end">

      <CSVLink

        data={applications}

        headers={headers}

        filename="applications.csv"


        aria-label="Export job applications as CSV file"


        title="Download applications CSV"


        className="
          rounded-lg
          bg-green-600
          px-4
          py-2
          text-white
          hover:bg-green-700
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "

      >

        Export CSV

      </CSVLink>


    </div>

  );

}


export default ExportButton;