import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiAuthenticated } from "../../http";
import { useNavigate } from "react-router-dom";

const AddSchool = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    schoolDomain: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiAuthenticated.post("/register", formData);
      if (response.status === 201) {
        toast.success("Admin created successfully!");
        setTimeout(() => navigate("/super-admin/view/school"), 2000);
      } else {
        toast.error("Failed to create admin");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-10 max-w-4xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-8">👨‍🏫 Add Admin</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter admin email"
            required
            className="bg-gray-50 border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="bg-gray-50 border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>

        {/* School Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Domain <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="schoolDomain"
            value={formData.schoolDomain}
            onChange={handleChange}
            placeholder="Enter unique school domain"
            required
            className="bg-gray-50 border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg transition-all shadow-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchool;
