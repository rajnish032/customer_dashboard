// "use client";

// import React, { useState, useEffect } from "react";
// import { CgSearch } from "react-icons/cg";
// import { Spinner } from "@nextui-org/react";
// import JobCard from "../components/JobCard";
// import Cookies from "universal-cookie";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { reqUrl } from "@/utils/constants";
// import { getAllJob } from "@/routes/agentJob";
// const cookies = new Cookies(null, { path: "/" });

// const JobModal = () => {
//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [loader, setLoader] = useState(false);

//   // Extract unique industries for filtering
//   const industries = jobs && jobs.length > 0 
//     ? ["All", ...new Set(jobs.map(job => job.industrytype))].filter(Boolean)
//     : ["All"];

//   const filteredJobs = jobs.filter(
//     (job) =>
//       (activeTab === "All" || job.industrytype === activeTab) &&
//       (job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//        job?.companyname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//        job?.location?.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const fetchJobs = async () => {
//     const token = cookies.get("auth");
//     if (token) {
//       await getAllJob(setJobs, token);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleDeleteJob = async (jobId) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     const token = cookies.get("auth");

//     if (!token) {
//       toast.error("You are unauthorized. Kindly login!");
//       return;
//     }

//     try {
//       setLoader(true);
//       await axios.delete(`${reqUrl}/agent/job/delete/${jobId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       toast.success("Job Deleted Successfully");
//       // Refresh the jobs list
//       getAllJob(setJobs, token);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Could not delete job. Try again!"
//       );
//     } finally {
//       setLoader(false);
//     }
//   };

//   return (
//     <div className="rounded-md shadow relative bg-white p-4">
//       <h2 className="text-2xl font-bold mb-6">Your Posted Jobs</h2>
      
//       {/* Search Bar */}
//       <div className="flex items-center px-2 justify-between mt-2 mb-6">
//         <div className="flex items-center border rounded-lg p-2 w-full md:w-1/2">
//           <CgSearch className="text-gray-500 text-xl mr-2" />
//           <input
//             type="text"
//             placeholder="Search jobs by title, company, or location"
//             className="flex-1 text-tiny md:text-sm outline-none bg-transparent"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Industry Filter Tabs */}
//       {industries.length > 1 && (
//         <div className="flex items-center gap-3 text-sm my-4 flex-wrap border-b p-2 md:p-4">
//           {industries.map((industry) => (
//             <button
//               key={industry}
//               className={`cursor-pointer px-3 max-sm:text-tiny font-medium text-center py-1 rounded ${
//                 activeTab === industry
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white"
//               }`}
//               onClick={() => setActiveTab(industry)}
//             >
//               {industry}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Jobs List */}
//       {loader ? (
//         <div className="flex justify-center py-8">
//           <Spinner label="Loading jobs..." />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {filteredJobs.length === 0 ? (
//             <div className="text-center text-gray-500 col-span-full py-8">
//               {jobs.length === 0 
//                 ? "You haven't posted any jobs yet." 
//                 : "No jobs match your search criteria."}
//             </div>
//           ) : (
//             filteredJobs.map((job) => (
//               <JobCard
//                 handleDelete={handleDeleteJob}
//                 jobId={job._id}
//                 key={job._id}
//                 job={job}
//               />
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobModal;



"use client";

import React, { useState, useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { Spinner } from "@nextui-org/react";
import JobCard from "../components/JobCard";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { reqUrl } from "@/utils/constants";
import { getAllJob } from "@/routes/agentJob";
//import DelModal from "../components/DelModal";

const cookies = new Cookies(null, { path: "/" });

const JobModal = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loader, setLoader] = useState(true);
  const [debugInfo, setDebugInfo] = useState("");

  const cookies = new Cookies(null, { path: "/" });

  const fetchJobs = async () => {
    const token = cookies.get("auth");
    if (token) {
      await getAllJob(setJobs, token, setLoader, setDebugInfo);
    }

    try {
      setLoader(true);
      const response = await axios.get(`${reqUrl}/agent/jobs/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });


      
      // Check various possible response structures
      const jobsData = response.data.allJob || [];
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to fetch jobs";
      
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    const token = cookies.get("auth");

    if (!token) {
      toast.error("You are unauthorized. Kindly login!");
      return;
    }

    try {
      setLoader(true);
      await axios.delete(`${reqUrl}/agent/job/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("Job Deleted Successfully");
          getAllJob(setJobs, token, setLoader)
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not delete job. Try again!"
      );
    } finally {
      setLoader(false);
    }
  };

  // Extract unique industries for filtering
  const industries = jobs && jobs.length > 0 
    ? ["All", ...new Set(jobs.map(job => job.industrytype).filter(Boolean))]
    : ["All"];

  const filteredJobs = jobs.filter(
    (job) =>
      (activeTab === "All" || job.industrytype === activeTab) &&
      (job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       job?.companyname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       job?.location?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="rounded-md shadow relative bg-white p-4">
      <h2 className="text-2xl font-bold mb-6">Your Posted Jobs</h2>
      
      
      {/* Search Bar */}
      <div className="flex items-center px-2 justify-between mt-2 mb-6">
        <div className="flex items-center border rounded-lg p-2 w-full md:w-1/2">
          <CgSearch className="text-gray-500 text-xl mr-2" />
          <input
            type="text"
            placeholder="Search jobs by title, company, or location"
            className="flex-1 text-tiny md:text-sm outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Industry Filter Tabs */}
      {industries.length > 1 && (
        <div className="flex items-center gap-3 text-sm my-4 flex-wrap border-b p-2 md:p-4">
          {industries.map((industry) => (
            <button
              key={industry}
              className={`cursor-pointer px-3 max-sm:text-tiny font-medium text-center py-1 rounded ${
                activeTab === industry
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white"
              }`}
              onClick={() => setActiveTab(industry)}
            >
              {industry}
            </button>
          ))}
        </div>
      )}

      {/* Jobs List */}
      {loader ? (
        <div className="flex justify-center py-8">
          <Spinner label="Loading jobs..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-gray-500 col-span-full py-8">
              {jobs.length === 0 
                ? "You haven't posted any jobs yet." 
                : "No jobs match your search criteria."}
              {/* <button 
                onClick={fetchJobs}
                className="block mt-4 mx-auto px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Refresh Jobs
              </button> */}
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                handleDelete={handleDeleteJob}
                jobId={job._id}
                key={job._id}
                job={job}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default JobModal;