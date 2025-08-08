import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { apiAuthenticated } from "../../http";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../component/loader/loader";

const headers = {
  sn: "S.N.",
  firstName: "First Name",
  lastName: "Last Name",
  emailAddress: "Email",
  phoneNumber: "Phone Number",
  message: "Message",
  action: "Action",
};

const Message = () => {
  const [message, setMessage] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const response = await apiAuthenticated.get("/message");
      if (response.status === 200) {
        setMessage(response.data.data);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loadingMessages) {
    return <Loader />;
  }

  const deleteMessage = async (messageId) => {
    try {
      const response = await apiAuthenticated.delete(`/message/${messageId}`);
      if (response.status === 200) {
        toast.success("Message deleted successfully!");
        setMessage((prev) => prev.filter((m) => m.id !== messageId));
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error deleting message");
      console.error(error);
    }
  };



  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-10">
        Message List
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
                {message.length > 0 ? (
                  message.map((msg, index) => (
                    <tr key={msg.id} className="hover:bg-gray-50">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{msg.firstName}</td>
                      <td className="p-4">{msg.lastName}</td>
                      <td className="p-4">{msg.emailAddress}</td>
                      <td className="p-4">{msg.phoneNumber}</td>
                      <td className="p-4">{msg.message}</td>

                      <td className="p-4">
                        <div className="flex gap-2 items-center">
                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={async () => {
                              const confirmed = window.confirm(
                                "Are you sure you want to delete this message?"
                              );
                              if (confirmed) {
                                await deleteMessage(msg.id); 
                              }
                            }}
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
                    <td colSpan={8} className="p-4 text-center text-red-500 text-base">
                      No Messages found.
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

export default Message;
