import useApplicationStore from "../../store/applicationStore";


function ApplicationTable({ applications }) {

  const deleteApplication =
    useApplicationStore(
      (state) => state.deleteApplication
    );

  const updateStatus =
    useApplicationStore(
      (state) => state.updateStatus
    );


  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this application?"
      );


    if (!confirmed) return;


    await deleteApplication(id);

  };


  const handleStatusChange = async (id, newStatus) => {

    await updateStatus(id, newStatus);

  };


  return (

    <table
      data-testid="application-table"
      className="application-table w-full border-collapse"
    >


      <thead>

        <tr>

          <th>
            Company
          </th>


          <th>
            Role
          </th>


          <th>
            Status
          </th>


          <th>
            Action
          </th>


        </tr>

      </thead>



      <tbody>


        {
          applications.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="text-center p-4"
              >
                No applications found
              </td>

            </tr>


          ) : (


            applications.map(
              (application) => (


                <tr

                  data-testid="application-row"

                  key={
                    application.id
                  }

                >


                  <td>
                    {
                      application.company
                    }
                  </td>



                  <td>
                    {
                      application.role
                    }
                  </td>



                  <td>

                    <select
                      value={
                        application.status
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          application.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="APPLIED">
                        Applied
                      </option>

                      <option value="PHONE_SCREEN">
                        Phone Screen
                      </option>

                      <option value="INTERVIEW">
                        Interview
                      </option>

                      <option value="OFFER">
                        Offer
                      </option>

                      <option value="REJECTED">
                        Rejected
                      </option>

                    </select>

                  </td>



                  <td>


                    <button

                      data-testid="delete-button"

                      onClick={() =>
                        handleDelete(
                          application.id
                        )
                      }

                    >

                      Delete

                    </button>


                  </td>



                </tr>


              )


            )


          )

        }


      </tbody>


    </table>

  );


}


export default ApplicationTable;