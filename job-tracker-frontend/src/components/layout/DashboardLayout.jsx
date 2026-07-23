import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import NotificationBell from "../NotificationBell";
import SkipToContent from "../SkipToContent";


function DashboardLayout({ children }) {

  return (

    <div className="min-h-screen bg-background">

      {/* Accessibility */}
      <SkipToContent />


      {/* Navigation */}
      <aside aria-label="Main sidebar navigation">

        <Sidebar />

      </aside>



      {/* Main Application Area */}
      <div className="md:ml-64">


        {/* Header */}
        <header
          className="flex items-center justify-between"
          aria-label="Application header"
        >

          <Navbar />


          {/* Notification */}
          <div className="mr-6">

            <NotificationBell />

          </div>


        </header>



        {/* Main Content */}
        <main
          id="main-content"
          className="p-6"
          tabIndex="-1"
        >

          {children}

        </main>


      </div>


    </div>

  );

}


export default DashboardLayout;