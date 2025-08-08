import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import Protect from "./component/Protected";
import DashboardLayout from "./component/Layout/DashboardLayout";
import SuperLayout from "./component/Layout/SuperLayout";

import News from "./Pages/add/News";
import AddSchool from "./Pages/add/School";
import ViewSchool from "./Pages/view/School";
import ViewNews from "./Pages/view/News";
import NewsEdit from "./Pages/edit/EditNews";
import Admission from "./Pages/view/Admission";
import Message from "./Pages/view/Message";
import Home from "./component/Home";
import NoticeForm from "./Pages/add/Notice";
import Notice from "./Pages/view/Notice";
import NoticeEdit from "./Pages/edit/EditNotice";

const App = () => {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login setRole={setRole} />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <Protect onRole={setRole}>
              {role === "admin" ? <DashboardLayout /> : <Navigate to="/login" />}
            </Protect>
          }
        >
          <Route index element={<Home/>} />
          <Route path="add/news" element={<News />} />
         <Route path="view/news" element={<ViewNews/>} />
         <Route path="edit/news/:id" element={<NewsEdit/>} />
         <Route path="add/notices" element= {<NoticeForm/>} />
         <Route path= 'view/notices' element = {<Notice/>} />
         <Route path="edit/notices/:id" element= {<NoticeEdit/>} />
         <Route path="view/admission" element={<Admission/>} />
         <Route path="view/message" element={<Message/>} />
        </Route>

        {/* SuperAdmin Routes */}
        <Route
          path="/super-admin/*"
          element={
            <Protect onRole={setRole}>
              {role === "superAdmin" ? (
                <SuperLayout />
              ) : (
                <Navigate to="/login" />
              )}
            </Protect>
          }
        >
          <Route path="add/school" element={<AddSchool />} />
         <Route path="view/school" element={<ViewSchool />} />
          
        </Route>

      
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
