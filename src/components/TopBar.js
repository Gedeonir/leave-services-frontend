import React from "react";
import { LogOut, UserCircle } from "lucide-react";
import { memo } from "react";

function Topbar(props) {
  const handleLogout=()=>{
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('role');
    window.location.reload();
  }

  const filteredEmployee = props?.employees?.find(emp => emp.id === props?.userData.loggedInUser);

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="text-2xl font-bold text-primary">{props.title}</div>
      <div className="flex items-center gap-4">
        <UserCircle className="w-6 h-6 text-gray-600" />
        <span className="text-sm text-gray-700">Welcome, {filteredEmployee?.name}</span>
        <button onClick={()=>handleLogout()} className="text-sm text-red-500 hover:underline flex items-center gap-1">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
}

export default memo(Topbar);