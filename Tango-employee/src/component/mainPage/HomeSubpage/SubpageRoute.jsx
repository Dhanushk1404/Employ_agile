import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const SubpageRoute = () => {
  return (
    <div className='flex flex-col'>
      <div className="w-full md:w-[100%] relative -top-10">
        <nav className="bg-white p-5 rounded-lg">
          <ul className="flex flex-wrap gap-4 md:space-x-10">
            <li>
              <Link to="" className="hover:border-b-2 hover:border-blue-500">Activities</Link>
            </li>
            <li>
              <Link to="feeds" className="hover:border-b-2 hover:border-blue-500">Feeds</Link>
            </li>
            <li>
              <Link to="leaveapproval" className="hover:border-b-2 hover:border-blue-500">Leave Approvals</Link>
            </li>
            <li>
              <Link to="attendence" className="hover:border-b-2 hover:border-blue-500">Check In</Link>
            </li>
            <li>
              <Link to="timelog" className="hover:border-b-2 hover:border-blue-500">Time Logs</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default SubpageRoute
