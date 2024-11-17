import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./component/Startpage/Start";
import Login from "./component/Auth/Login";
import CompanyCreate from "./component/Auth/CompanyCreate";
import OrganizationDetails from "./component/Auth/CompanySide/OrganizationDetails";
import Location from "./component/Auth/CompanySide/Location";
import Department from "./component/Auth/CompanySide/Department";
import HomePage from "./component/mainPage/HomePage";
import AdminHome from "./component/mainPage/pages/AdminHome";
import Overview from "./component/mainPage/pages/Overview";
import Dashboard from "./component/mainPage/pages/Dashboard";
import SubpageRoute from "./component/mainPage/HomeSubpage/SubpageRoute";
import Feeds from "./component/mainPage/HomeSubpage/Feeds";
import Activity from "./component/mainPage/HomeSubpage/Activity";
import Calender from "./component/mainPage/Calender";
import Onboard from "./component/mainPage/Onboard";
import EmployeeData from "./component/employeeform/EmployeeData";
import Profile from "./component/mainPage/Profile";
import LeaveApproval from "./component/mainPage/HomeSubpage/LeaveApproval";
import LeaveContent from "./component/mainPage/LeaveContent";
import Attendence from "./component/mainPage/HomeSubpage/Attendence";
import Timelog from "./component/mainPage/HomeSubpage/Timelog";
import MainAttendence from "./component/mainPage/MainAttendence";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />

        <Route path="/companycreate" element={<CompanyCreate />}>
          <Route index element={<OrganizationDetails />} />
          <Route path="locations" element={<Location />} />
          <Route path="departments" element={<Department />} />
        </Route>

        <Route exact path="/homepage" element={<HomePage />}>
          <Route path="/homepage" element={<AdminHome />}>
            <Route path="onboard" element={<Onboard />} />
            <Route exact path="" element={<Overview />}>
              <Route path="" element={<SubpageRoute />}>
                <Route path="" element={<Activity />} />
                <Route path="feeds" element={<Feeds />} />
                <Route path="leaveapproval" element={<LeaveApproval />} />
                <Route path="attendence" element={<Attendence />} />
                <Route path="timelog" element={<Timelog />} />
              </Route>
            </Route>

            <Route path="dasboard" element={<Dashboard />} />
            <Route path="calendar" element={<Calender />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="leavecontent" element={<LeaveContent />} />
            <Route path="attendance" element={<MainAttendence />} />
            <Route path="homepage/profile" element={<Profile />} />
          </Route>
        </Route>

            <Route path="/employeedata" element={<EmployeeData />} />
   
      </Routes>
    </BrowserRouter>
  );
};

export default App;
