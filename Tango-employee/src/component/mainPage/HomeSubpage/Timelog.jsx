import React, { useState } from "react";
import axios from "axios";

const Timelog = () => {
  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(localStorage.getItem("organizationDetails"));

  const companyMail = organizationDetails.organizationDetails.organization.contactEmail;
  console.log(companyMail);

  const [logs, setLogs] = useState([]);
  const [task, setTask] = useState("");
  const [timeSpent, setTimeSpent] = useState("");

  const addLog = async () => {
    if (task && timeSpent && timeSpent > 0) {
      const newLog = { companyMail, task, timeSpent };

      try {
        const response = await axios.post('http://localhost:5000/tango/api/logs', {
          companyMail,
          task,
          timeSpent
        });

        console.log("New log added:", newLog);
        setLogs((prevLogs) => [...prevLogs, { ...newLog, id: response.data.id }]);

        setTask("");
        setTimeSpent("");
      } catch (error) {
        console.error("Error sending log to backend:", error);
      }
    } else {
      console.log("Please provide valid task and time spent");
    }
  };

  const deleteLog = async (index) => {
    const logToDelete = logs[index];
    console.log("sdfd", logToDelete);
    try {
      await axios.delete(`http://localhost:5000/tango/api/logs/${logToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
      console.log("Log deleted:", logToDelete);
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">Add New Log</h2>
        <input
          type="text"
          placeholder="Task Description"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Time Spent (hours)"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addLog}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
        >
          Add Log
        </button>
      </div>

      <div className="w-full max-w-md">
        {logs.length > 0 ? (
          <ul className="bg-white shadow-md rounded-lg p-4 space-y-4">
            {logs.map((log, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b last:border-b-0 py-2"
              >
                <div>
                  <p className="text-gray-700 font-medium">{log.task}</p>
                  <p className="text-gray-500 text-sm">{log.timeSpent} hours</p>
                </div>
                <button
                  onClick={() => deleteLog(index)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No logs available</p>
        )}
      </div>
    </div>
  );
};

export default Timelog;
