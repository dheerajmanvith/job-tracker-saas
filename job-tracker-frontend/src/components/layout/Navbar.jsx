import ThemeToggle from "../ThemeToggle";


function Navbar() {

  return (

    <header
      className="
      h-16
      border-b
      bg-background
      flex
      items-center
      justify-between
      px-6
      "
    >

      {/* Page Title */}
      <div>

        <h2 className="
          text-lg
          font-semibold
        ">
          Dashboard
        </h2>

      </div>


      {/* Actions */}
      <div
        className="
        flex
        items-center
        gap-3
        "
      >

        {/* Dark Mode */}
        <ThemeToggle />


        {/* Profile */}
        <button
          className="
          rounded-lg
          bg-primary
          text-primary-foreground
          px-4
          py-2
          text-sm
          font-medium
          hover:opacity-90
          transition
          "
        >

          Profile

        </button>


      </div>


    </header>

  );

}


export default Navbar;