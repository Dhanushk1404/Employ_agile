import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveApproval = () => {
  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(localStorage.getItem("organizationDetails"));
  const companyEmail = organizationDetails?.organizationDetails?.organization?.contactEmail;

  const [leavedata, setleavedata] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!companyEmail) return;

      try {
        const response = await axios.get(`http://localhost:5000/tango/leave/${companyEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setleavedata(response.data.leavedata);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching leave data:", error);
      }
    }

    fetchData();
  }, [companyEmail, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

 
  const handleAccept = async (leave) => {
    try {
      const response = await axios.post('http://localhost:5000/tango/leavemail/acceptleave', {
        email: leave.email,
        firstName: leave.firstName,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Leave accepted and email sent');
    } catch (error) {
      alert('Error accepting leave');
      console.error(error);
    }
  };

 
  const handleReject = async (leave) => {
    try {
      const response = await axios.post('http://localhost:5000/tango/leavemail/rejectleave', {
        email: leave.email,
        firstName: leave.firstName,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Leave rejected and email sent');
    } catch (error) {
      alert('Error rejecting leave');
      console.error(error);
    }
  };

  return (
    <div>
      <section>
        {leavedata.length > 0 ? (
          leavedata.map((data, index) => (
            <div key={index} className="bg-white rounded-lg p-5">
              <div className="flex items-center gap-2">
                <img src={`http://localhost:5000/${data.logo}`} alt="" className="w-32 rounded-lg" />
                <div className="border-b-2 p-2">
                  <h1 className="font-poppins">Name: {data.firstName}</h1>
                  <h1 className="font-poppins">Leave Type: {data.leaveType}</h1>
                  <h1 className="font-poppins">Email: {data.email}</h1>
                </div>
                <div className="font-poppins pl-3">
                  <h1 className="text-blue-700">Date</h1>
                  <h1>From: {formatDate(data.startDate)}</h1>
                  <h1>To: {formatDate(data.endDate)}</h1>
                </div>
              </div>
              <div className="pl-36 mt-2">
                <h1 className="font-poppins text-rose-600">Reason</h1>
                <p className="font-poppins p-2">* {data.reason}</p>
              </div>

              <div className="flex gap-3 pl-36 text-white">
                <button className="px-6 py-2 bg-green-500 rounded-lg" onClick={() => handleAccept(data)}>
                  Accept
                </button>
                <button className="px-6 py-2 bg-red-500 rounded-lg" onClick={() => handleReject(data)}>
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No leave data available</p>
        )}
      </section>
    </div>
  );
};

export default LeaveApproval;
