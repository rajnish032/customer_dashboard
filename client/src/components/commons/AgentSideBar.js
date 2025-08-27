"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { Fa1, FaChartLine, FaGalacticRepublic } from "react-icons/fa6";
import { TbDrone } from "react-icons/tb";
import { FaRegFolder, FaHistory } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { PiSignOut } from "react-icons/pi";
import { agentData, SidebarState } from "@/atom/states";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const AgentSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser] = useRecoilState(agentData);
  const [open, setOpen] = useRecoilState(SidebarState);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Determine active section based on current path
  useEffect(() => {
    if (pathname.includes("/dashboard")) {
      setActiveSection("dashboard");
    } else if (pathname.includes("/projects")) {
      setActiveSection("projects");
      setProjectsOpen(true);
    } else if (pathname.includes("/postjob")) {
      setActiveSection("jobs");
      setJobsOpen(true);
    } else if (pathname.includes("/profile")) {
      setActiveSection("profile");
    }
  }, [pathname]);

  const handleLogout = () => {
    cookies.remove("auth");
    router.push("/agent/login");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-20"
        } bg-stone-700 h-screen relative p-2 lg:p-5 pt-8 duration-300 hidden md:block`}
      >
        {/* Sidebar toggle */}
        <IoIosArrowDroprightCircle
          className={`absolute max-md:hidden z-[1600] text-blue-400 cursor-pointer text-2xl -right-3 top-9 w-7 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        {/* Logo */}
        <div className="flex gap-x-4 items-center">
          <img
            src="https://s3.ap-south-1.amazonaws.com/refrens.images/60cc1382083e180012f4abe1/65ae1f9582205200279e2290/ref1705910174489.png"
            className={`cursor-pointer w-[80%] object-cover duration-500`}
          />
        </div>

        <ul className="pt-6">
          {/* Dashboard */}
          <Link
            title="Dashboard"
            href={`/agent/dashboard/${currentUser?.fullName
              ?.toLowerCase()
              ?.replace(" ", "-")}`}
            className={`flex my-1 rounded-md p-2 cursor-pointer text-gray-100 items-center gap-x-4 ${
              activeSection === "dashboard"
                ? "bg-stone-500 text-white"
                : "hover:bg-stone-600"
            }`}
          >
            <MdDashboard className="text-xl max-sm:text-sm" />
            <span className={`${!open && "hidden"} origin-left text-md duration-200`}>
              Dashboard
            </span>
          </Link>

          {/* Projects parent */}
          <div
            onClick={() => setProjectsOpen(!projectsOpen)}
            className={`flex my-1 rounded-md p-2 cursor-pointer text-gray-100 items-center gap-x-4 ${
              activeSection === "projects"
                ? "bg-stone-500 text-white"
                : "hover:bg-stone-600"
            }`}
          >
            <FaRegFolder className="text-xl max-sm:text-sm" />
            <span className={`${!open && "hidden"} origin-left text-md duration-200`}>
              Projects
            </span>
            {open && (
              <IoIosArrowDroprightCircle
                className={`ml-auto transition-transform duration-300 ${
                  projectsOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </div>

          {/* Projects sub-menu */}
          {projectsOpen && open && (
            <div className="ml-8 flex flex-col">
              <Link
                href={`/agent/projects/add/${currentUser?.fullName
                  ?.toLowerCase()
                  ?.replace(" ", "-")}`}
                className={`my-1 p-2 rounded-md text-gray-200 text-sm ${
                  pathname.includes("/projects/add")
                    ? "bg-stone-500 text-white"
                    : "hover:bg-stone-600"
                }`}
              >
                Add Project
              </Link>
              <Link
                href={`/agent/projects/list/${currentUser?.fullName
                  ?.toLowerCase()
                  ?.replace(" ", "-")}`}
                className={`my-1 p-2 rounded-md text-gray-200 text-sm ${
                  pathname.includes("/projects/list")
                    ? "bg-stone-500 text-white"
                    : "hover:bg-stone-600"
                }`}
              >
                Project List
              </Link>
              <Link
                href={`/agent/projects/applicant/${currentUser?.fullName
                  ?.toLowerCase()
                  ?.replace(" ", "-")}`}
                className={`my-1 p-2 rounded-md text-gray-200 text-sm ${
                  pathname.includes("/project/applicant")
                    ? "bg-stone-500 text-white"
                    : "hover:bg-stone-600"
                }`}
              >
                Project Applicants
              </Link>
            </div>
          )}

          {/* JOB POST */}
          <div
            onClick={() => setJobsOpen(!jobsOpen)}
            className={`flex my-1 rounded-md p-2 cursor-pointer text-gray-100 items-center gap-x-4 ${
              activeSection === "jobs"
                ? "bg-stone-500 text-white"
                : "hover:bg-stone-600"
            }`}
          >
            <FaGalacticRepublic className="text-xl max-sm:text-sm" />
            <span className={`${!open && "hidden"} origin-left text-md duration-200`}>
              Job
            </span>
            {open && (
              <IoIosArrowDroprightCircle
                className={`ml-auto transition-transform duration-300 ${
                  jobsOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </div>

          {/* Jobs sub-menu */}
          {jobsOpen && open && (
            <div className="ml-8 flex flex-col">
              <Link
                href={`/agent/postjob/add/${currentUser?.fullName
                  ?.toLowerCase()
                  ?.replace(" ", "-")}`}
                className={`my-1 p-2 rounded-md text-gray-200 text-sm ${
                  pathname.includes("/postjob/add")
                    ? "bg-stone-500 text-white"
                    : "hover:bg-stone-600"
                }`}
              >
                Post Job
              </Link>
              <Link
                href={`/agent/postjob/list/${currentUser?.fullName
                  ?.toLowerCase()
                  ?.replace(" ", "-")}`}
                className={`my-1 p-2 rounded-md text-gray-200 text-sm ${
                  pathname.includes("/postjob/list")
                    ? "bg-stone-500 text-white"
                    : "hover:bg-stone-600"
                }`}
              >
                Job List
              </Link>
              <Link
                href={`/agent/postjob/applicant/${currentUser?.fullName
                  ?.toLowerCase()
                  ?.replace(" ", "-")}`}
                className={`my-1 p-2 rounded-md text-gray-200 text-sm ${
                  pathname.includes("/postjob/applicant")
                    ? "bg-stone-500 text-white"
                    : "hover:bg-stone-600"
                }`}
              >
                Job Applicants
              </Link>
            </div>
          )}
        </ul>

        {/* Sign Out */}
        <div
          onClick={handleLogout}
          title="Sign out"
          className="flex my-1 hover:bg-stone-600 inset-x-0 w-[80%] mx-auto rounded-md p-2 cursor-pointer text-gray-100 items-center gap-x-4 bottom-10 absolute"
        >
          <PiSignOut className={`text-xl ${!open && "mx-auto"}`} />
          <span className={`${!open && "hidden"} origin-left text-md duration-200`}>
            Sign Out
          </span>
        </div>
      </div>
    </>
  );
};

export default AgentSideBar;