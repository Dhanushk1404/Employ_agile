import React, { useEffect, useState } from "react";
import axios from "axios";

const Feeds = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [feedData, setFeedData] = useState([]);

  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(localStorage.getItem("organizationDetails"));

  const email = organizationDetails.organizationDetails.organization.contactEmail;

  const handlePostAnnouncement = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tango/api/feed",
        { message, email }
      );

      console.log("Announcement posted:", response.data);
      setMessage("");
      setIsModalOpen(false);
      await getDataFeed();
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  const getDataFeed = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tango/feeds/${email}`);
      setFeedData(response.data.data || []); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFeed();
  }, [email]);

  return (
    <div className="h-screen overflow-scroll mb-[100vh] md:w-[130%] ">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 p-2 bg-black text-white rounded hover:bg-blue-600 transition mt-10 flex justify-start"
      >
        Add Announcement
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add an Announcement</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              rows="4"
              placeholder="Enter your announcement here"
            />
            <div className="flex justify-end">
              <button
                onClick={handlePostAnnouncement}
                className="mr-2 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Post
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {feedData.map((data) => (
        <div key={data._id} className="mt-4 bg-white w-full  rounded-md p-3 ">
          <div className="flex items-center p-4 rounded-md mb-2">
            <div>
              <img
                src={`http://localhost:5000${organizationDetails.organizationDetails.organization.logo}`}
                alt="Organization Logo"
                className="w-24 rounded-full mr-4"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">Have Posted an Announcement</h1>
              <p className="text-sm text-gray-500">
                {new Date(data.createdAt).toLocaleDateString()} 
              </p>
            </div>
          </div>

          <div className="m-7 border rounded-md p-3">
            <p>{data.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feeds;
