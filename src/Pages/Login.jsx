import { useState } from "react";
import API from "../http";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/admin.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await API.post("/login", data);

      if (response.status === 200) {
        const role = response.data?.user?.role;

        if (!role) {
          toast.warning("Login successful, but role not found");
          navigate("/login");
          return;
        }

        if (role === "admin") navigate("/admin");
        else if (role === "superAdmin") navigate("/super-admin");
        else {
          toast.error("Unrecognized role");
          navigate("/login");
        }
      } else toast.error("Login failed");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex flex-col lg:flex-row w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Left - Login Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-3 sm:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 20.25A7.5 7.5 0 0112 12a7.5 7.5 0 017.5 8.25"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Please login to continue
              </p>
            </div>

            <form onSubmit={handleClick}>
              {/* Email Field */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                  placeholder="you@example.com"
                  onChange={handleChange}
                />
              </div>

              {/* Password Field */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white transition-colors ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 cursor-pointer"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>


        {/* Right - Logo Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-6 sm:p-10">
          <img src={logo1} alt="Logo" className="w-auto h-48 sm:h-auto mb-3 sm:mb-4" />
          <h1 className="text-base sm:text-lg font-semibold text-gray-700 mt-2 text-center">
            <span className="text-red-500">— Powered By</span> Nepal Leadership
            Production
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
