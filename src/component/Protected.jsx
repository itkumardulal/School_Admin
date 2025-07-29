import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../http";
import Loader from "./loader/loader";

const Protect = ({ children, onRole }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await API.get("/verify");
        if (res.data.success) {
          onRole?.(res.data.user.role);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };

    verifyToken();
  }, []); // ✅ Run only once on mount

  if (isValid === null) return <Loader />;
  if (!isValid) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default Protect;
