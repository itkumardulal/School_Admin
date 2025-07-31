import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/bhawagati.jpg";

const Home = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Add News", color: "bg-purple-600 hover:bg-purple-700", path: "/admin/add/news" },
    { label: "View Admission", color: "bg-blue-600 hover:bg-blue-700", path: "/admin/view/admission" },
    { label: "Add Message", color: "bg-green-600 hover:bg-green-700", path: "/admin/view/message" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-4xl min-h-[700px] flex flex-col justify-between">
        
        {/* Top Section */}
        <div className="flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-white mb-6">
            <img
              src={logo}
              alt="Bhawagati Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Bhawagati School Admin Panel</h1>
          <p className="text-md text-gray-500 mt-2">
            Welcome! Manage news, admissions & messages with ease.
          </p>
        </div>

        {/* Button Section at Bottom */}
        <div className="flex flex-wrap justify-center gap-18 mt-10">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`${btn.color} text-white font-medium px-6 py-3 w-48 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 hover:cursor-pointer`}
              onClick={() => navigate(btn.path)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
