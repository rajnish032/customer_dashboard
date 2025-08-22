"use client";

import { agentData, agentProject } from "@/atom/states";
import React, { useState, useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { Spinner } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import ProjectCard from "./components/ProjectCard";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { reqUrl } from "@/utils/constants";
import { getAllProj } from "@/routes/agentProj";

const cookies = new Cookies(null, { path: "/" });

const AllProjects = () => {
  const [agentProj, setAgentProj] = useRecoilState(agentProject);
  const [user] = useRecoilState(agentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loader, setLoader] = useState(false);

  const categories =
    agentProj?.length > 0
      ? ["All", ...new Set(agentProj?.map((project) => project.industry))]
      : [];

  const filteredProjects = agentProj?.filter(
    (project) =>
      (activeTab === "All" || project.industry === activeTab) &&
      project?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchProjects = async () => {
    const token = cookies.get("auth");
    if (token) {
      await getAllProj(setAgentProj, token);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projId) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const token = cookies.get("auth");

    if (!token) return toast.error("You are unauthorized. Kindly login!");

    try {
      setLoader(true);
      await axios.delete(`${reqUrl}/agent/project/delete/${projId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success("Project Deleted");
      getAllProj(setAgentProj, token);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not delete project. Try again!"
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {!user ? (
        <div className="flex items-center justify-center h-[300px] w-full">
          <Spinner className="w-fit" />
        </div>
      ) : (
        <div className="rounded-md shadow relative bg-white p-4">
          {/* Search Bar */}
          <div className="flex items-center px-2 justify-between mt-2">
            <div className="flex items-center">
              <CgSearch className="text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search projects"
                className="flex-1 text-tiny md:text-sm outline-none rounded px-3 w-full md:w-1/2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Project Tabs */}
          <div className="flex items-center gap-3 text-sm my-4 flex-wrap border-b p-2 md:p-4">
            {categories?.map((tab) => (
              <div
                key={tab}
                className={`cursor-pointer px-3 max-sm:text-tiny font-medium text-center py-1 rounded ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "hover:bg-green-600 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Projects List */}
          {loader ? (
            <Spinner />
          ) : (
            <div className="flex items-center gap-5 flex-wrap md:justify-start justify-center">
              {filteredProjects?.length === 0 || !agentProj ? (
                <div className="text-sm text-center text-gray-900">
                  No Projects Found
                </div>
              ) : (
                filteredProjects?.map((project) => (
                  <ProjectCard
                    handleDelete={handleDeleteProject}
                    projId={project._id}
                    key={project._id}
                    project={project}
                  />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProjects;
