
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import logo5 from "../../assets/login.jpg";
import { apiAuthenticated } from "../../http";

const SuperLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await apiAuthenticated.post("/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const menuItems = [
    {
      name: "Add School",
      path: "/super-admin/add/school",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z"
        />
      ),
    },
    {
      name: "View Schools",
      path: "/super-admin/view/school",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 21V5a2 2 0 012-2h6v18H3z"
        />
      ),
    },
  ];

  return (
    <div className="bg-gray-100 h-screen flex">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 bg-white shadow-md flex flex-col overflow-y-auto">
        <div className="p-4 border-b flex flex-col items-center md:items-start">
          <img src={logo5} alt="Logo" className="h-12 w-auto mb-2" />
          <span className="text-lg font-semibold text-gray-800">Admin Dashboard</span>
        </div>

        <nav className="mt-5 px-2 space-y-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                location.pathname === item.path
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <svg
                className="h-6 w-6 mr-2 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {item.icon}
              </svg>
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t">
          <button
            onClick={() => {
              if (window.confirm("Do you want to logout?")) {
                handleLogout();
              }
            }}
            className="w-full flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-red-100 hover:text-red-700 rounded-md transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
            <span className="hidden md:inline ml-2">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperLayout;
