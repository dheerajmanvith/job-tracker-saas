import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import NotificationBell from "../NotificationBell";


function DashboardLayout({ children }) {

  return (

    <div className="min-h-screen bg-background">


      {/* Sidebar */}
      <Sidebar />



      {/* Main Content Area */}
      <div className="md:ml-64">


        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          <Navbar />


          {/* Notification Bell */}
          <div className="mr-6">

            <NotificationBell />

          </div>


        </div>



        {/* Page Content */}
        <main className="p-6">

          {children}

        </main>


      </div>


    </div>

  );

}


export default DashboardLayout;next