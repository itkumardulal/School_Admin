import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiAuthenticated } from "../../http";

const headers = {
  sn: "S.N.",
  fullName: "Full Name",
  gradeApplyingFor: "Grade",
  dob: "Date of Birth",
  gender: "Gender",
  guardianName: "Guardian Name",
  phoneNumber: "Phone Number",
  emailAddress: "Email",
  address: "Address",
  previousSchool: "Previous School",
  additionalInformation: "Additional Info",
  action: "Action",
};

const Admission = () => {
  const [admissions, setAdmissions] = useState([]);

  const fetchAdmissions = async () => {
    try {
      const response = await apiAuthenticated.get("/admission");
      if (response.status === 200) {
        setAdmissions(response.data.data);
      } else {
        console.error("Failed to fetch admissions");
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
    }
  };

  const deleteAdmission = async (admissionId) => {
    try {
      const response = await apiAuthenticated.delete(`admissions/${admissionId}`);
      if (response.status === 200) {
        toast.success("Admission deleted successfully!");
        setAdmissions((prev) => prev.filter((a) => a.id !== admissionId));
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error deleting admission");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-10">
        Admission List
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg border-gray-300 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  {Object.values(headers).map((header, index) => (
                    <th key={index} className="p-4 text-left whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {admissions.length > 0 ? (
                  admissions.map((admission, index) => (
                    <tr key={admission.id} className="hover:bg-gray-50">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{admission.fullName}</td>
                      <td className="p-4">{admission.gradeApplyingFor}</td>
                      <td className="p-4">{admission.dob}</td>
                      <td className="p-4">{admission.gender}</td>
                      <td className="p-4">{admission.guardianName}</td>
                      <td className="p-4">{admission.phoneNumber}</td>
                      <td className="p-4">{admission.emailAddress}</td>
                      <td className="p-4">{admission.Address}</td>
                      <td className="p-4">{admission.previousSchool}</td>
                      <td className="p-4">{admission.additionalInformation}</td>
                      <td className="p-4">
                        <div className="flex gap-2 items-center">
                      
                          {/* Delete Button */}
                          <button
                            onClick={() =>
                              window.confirm("Are you sure you want to delete this admission?") &&
                              deleteAdmission(admission.id)
                            }
                            className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center hover:cursor-pointer"
                          >
                             <svg
                              className="w-5 h-5 text-red-500 group-hover:text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h4a1 1 0 110 2h-1v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5H2a1 1 0 110-2h4V2zm2 5a1 1 0 10-2 0v7a1 1 0 102 0V7zm4 0a1 1 0 10-2 0v7a1 1 0 102 0V7z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className="p-4 text-center text-gray-500">
                      No Admission Data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;




                           