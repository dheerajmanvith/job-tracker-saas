import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


function DashboardLayout({ children }) {

  return (

    <div className="min-h-screen bg-background">


      {/* Sidebar */}
      <Sidebar />


      {/* Main Content Area */}
      <div className="md:ml-64">


        {/* Top Navbar */}
        <Navbar />


        {/* Page Content */}
        <main className="p-6">

          {children}

        </main>


      </div>


    </div>

  );

}


export default DashboardLayout;