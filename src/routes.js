
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import  NotFound from "./components/notFound";
import {Protected} from "./utils/ProtectedRoutes";
import SignIn from "./pages/SignIn";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import LeaveHistoryPage from "./pages/LeaveHistoryPage";
import DashboardLayout from "./pages/Admin";


const AppRoutes = (prop) => {

  return (
    <Routes>
        <Route path="/" index element={
          <Protected  route="/signin">              
            <Homepage />
          </Protected>
        } />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="*" element={<NotFound/>} />
        
        <Route path="/dashboard" element={
          <Protected  route="/signin">              
            <EmployeeDashboard/>
          </Protected>
        } />
        <Route path="/dashboard/leave-history" element={
          <Protected  route="/signin">              
            <LeaveHistoryPage/>
          </Protected>
        } />
        <Route path="/admin/dashboard/" element={
          <Protected  route="/signin">
            <DashboardLayout/>
          </Protected>
        } />
    </Routes>
    );
  };
  
  export default AppRoutes;