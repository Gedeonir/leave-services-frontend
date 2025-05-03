import React from 'react'

import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-primary text-white p-5">
      <h2 className="text-2xl font-bold mb-6">HR Admin</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink to="/manage-leave-types" className="hover:text-yellow-400">
              Manage Leave Types
            </NavLink>
          </li>
          <li>
            <NavLink to="/adjust-leave-balances" className="hover:text-yellow-400">
              Adjust Leave Balances
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-leave-calendars" className="hover:text-yellow-400">
              View Leave Calendars
            </NavLink>
          </li>
          <li>
            <NavLink to="/generate-reports" className="hover:text-yellow-400">
              Generate Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}


export default Sidebar