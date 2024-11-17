import React from "react";
import { useLocation } from "react-router-dom";
import bg from "../../assets/bg.jpg";

const Profile = () => {
  const location = useLocation();
  const data = location.state;

  console.log(data.checkinStatus);

  console.log("this is from profile page", data);

  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(
    localStorage.getItem("organizationDetails")
  );


  return (
    <div className="max-h-[600px] overflow-y-auto ">
      <main>
        <div className="sticky top-0 z-50">
          <div>
            <img src={bg} alt="" />
          </div>
          <div className="relative -top-28 ms-16 z-10">
            <img
              src={`http://localhost:5000/${data.profilePhoto}`}
              alt=""
              className="w-44 rounded-md "
            />
          </div>

          <div className="bg-gray-100 -top-48  relative p-3 flex justify-between ">
            <div className="flex gap-10 ">
              <div className="ms-60">
                <h1 className="text-3xl font-semibold font-poppins">
                  {data.employeeId}-{data.firstName}
                </h1>
                <h1 className="text-lg font-poppins mt-2">
                  {data.designation}
                </h1>
              </div>
              <div>
              <span className="text-red-700 text-1xl mt-10 font-poppins ">
                      {data.checkinStatus ? (
                        <p style={{ color: "green" }}>
                          Check In
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>
                          Yet to check in
                        </p>
                      )}
                    </span>
              </div>
            </div>

            <div className="me-[20vh]">
              <h1 className="text-1xl font-poppins text-gray-500">
                Reporting to
              </h1>
              <div className="flex gap-5 font-poppins font-semibolds">
                <h1>
                  {data.employeeId}-{data.firstName}
                </h1>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                  alt=""
                  className="w-14 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="px-32 relative -top-36 ">
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h1 className="font-poppins font-semibold text-xl border-b-2 mb-2">
                About
              </h1>
              <p>{data.aboutMe}</p>
            </div>
          </div>

          <div className="mt-5 font-poppins">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h1 className="font-poppins font-semibold text-xl border-b-2 mb-2">
                Basic Information
              </h1>
              <div className="flex space-x-10">
                <div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Employee ID:</h1>
                    <h1>{data.employeeId}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">First Name:</h1>
                    <h1>{data.firstName}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Last Name:</h1>
                    <h1>{data.lastName}</h1>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Nickname:</h1>
                    <h1>{data.nickname}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Email Address:</h1>
                    <h1>{data.email}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 font-poppins">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h1 className="font-poppins font-semibold text-xl border-b-2 mb-2">
                Work Information
              </h1>
              <div className="flex space-x-10">
                <div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Designation : </h1>
                    <h1>{data.designation}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Location:</h1>
                    <h1>{data.location}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Experience:</h1>
                    <h1>{data.experience}</h1>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Company email Address:</h1>
                    <h1>{data.companyMail}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 font-poppins">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h1 className="font-poppins font-semibold text-xl border-b-2 mb-2">
                Personal Information
              </h1>
              <div className="flex space-x-10">
                <div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">FirstName : </h1>
                    <h1>{data.firstName}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">LastName:</h1>
                    <h1>{data.lastName}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Gender:</h1>
                    <h1>{data.gender}</h1>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">DOB:</h1>
                    <h1>
                      {new Date(data.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h1>
                  </div>

                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Marital Status:</h1>
                    <h1>{data.maritalStatus}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Mobile Number:</h1>
                    <h1>{data.mobileNumber}</h1>
                  </div>
                </div>

                <div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Address:</h1>
                    <h1>
                      {data.address}
                    </h1>
                  </div>

                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Mobile Number:</h1>
                    <h1>{data.mobileNumber}</h1>
                  </div>
                  <div className="flex gap-2 m-4">
                    <h1 className="font-semibold">Additional Phone Number:</h1>
                    <h1>{data.phoneNumber}</h1>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
