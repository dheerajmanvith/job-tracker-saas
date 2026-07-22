import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Search,
  Settings,
} from "lucide-react";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Jobs",
      icon: Search,
      path: "/jobs",
    },
    {
      name: "Applications",
      icon: Briefcase,
      path: "/applications",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside
      className="
        hidden md:flex
        fixed
        left-0
        top-0
        h-screen
        w-64
        border-r
        bg-background
        p-5
        flex-col
      "
    >
      <h1 className="text-2xl font-bold mb-8">
        JobTracker 🚀
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                transition
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }
                `
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;