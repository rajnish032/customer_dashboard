

"use client";
import React, { useState } from "react";
import { IoLocation,IoCalendar, IoPricetag, IoReceipt, IoFolder } from "react-icons/io5";
import { FaTools, FaIndustry, FaTasks } from "react-icons/fa";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { TiDelete } from "react-icons/ti";
import { MdFileDownload } from "react-icons/md";
import dayjs from "dayjs";
import DelModal from "../../smallComponents/DelModal";

const industryImages = {
  Solar: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523457/6692f7ec62b53e48c07aa510cd3fdf16_npxmcn.jpg",
  Wind: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523860/2a5d9552856098222ca2c36b7d793102_nrbymx.jpg",
  Construction: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523928/free-photo-of-drone-shot-of-building-construction_roqlsr.jpg",
  Railways: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523978/train-traveling-down-train-tracks-next-to-a-forest_zvy6w0.jpg",
  Agriculture: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745524095/irri-bbm-rice-drone-demo-2-9d108c-1024_mnbmxs.jpg",
  Others: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745524173/original_1_w4tami.jpg",
};

const ProjectCard = ({ project, projId, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date) => date ? dayjs(date).format("DD/MM/YYYY") : "";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmDelete = () => {
    handleDelete(projId);
    closeModal();
  };

  const imageUrl = industryImages[project?.industry] || industryImages["Others"];

  return (
    <>
      <DelModal isOpen={isModalOpen} handleDelete={confirmDelete} handleClose={closeModal} />
          
      <Card className="relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border rounded-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <CardHeader className="flex justify-between items-start p-4 bg-gray-50 border-b">
          <div className="flex-1">
            <h4 className="font-bold text-xl">{project?.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{project?.objective}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {project?.industry}
              </span>
              <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {project?.application}
              </span>
              
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TiDelete
              onClick={() => handleDelete(projectId)}
              className="text-xl cursor-pointer text-red-600 hover:text-red-700 mt-1"
            />
          </div>
        </CardHeader>

        {/* Body */}
        <CardBody className="p-4 space-y-3">

          {project?.type && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <IoReceipt /> Project Type : {project?.type}
            </p>
          )}

          {/* Location */}
          {project?.location && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <IoLocation /> Location : {project?.location}
            </p>
          )}
          
          {/* Tools */}
          {project?.tools && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <FaTools /> Tools : {project?.tools}
            </p>
          )}
          
          {/* Budget */}
          {project?.budget && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <IoPricetag />Budget :  ₹{project?.budget} 
            </p>
          )}
          
          {/* Range Covered */}
          {project?.rangeCovered && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <FaTasks /> Range Covered : {project?.rangeCovered} {project?.type?.includes("linear") ? "km" : "acres/km²"}
            </p>
          )}
          
          {/* Dates */}
          <div className="flex justify-between text-xs text-gray-500">
            {project?.startDate && (
              <p className="flex items-center gap-1">
                <IoCalendar /> Start Date : {formatDate(project?.startDate)}
              </p>
            )}
            {project?.endDate && (
              <p className="flex items-center gap-1">
                <IoCalendar /> End Date : {formatDate(project?.endDate)}
              </p>
            )}
          </div>
          
          {/* Scope */}
          {project?.scope && (
            <p className="text-sm text-gray-700 line-clamp-3">Project Scope : {project?.scope}</p>
          )}
          {project?.phoneNumber && (
  <p className="text-sm text-gray-700 line-clamp-3">
    Phone No :{" "}
    <a href={`tel:${project.phoneNumber}`} className="text-blue-600 underline">
      {project.phoneNumber}
    </a>
  </p>
)}

{project?.email && (
  <p className="text-sm text-gray-700 line-clamp-3">
    Email :{" "}
    <a href={`mailto:${project.email}`} className="text-blue-600 underline">
      {project.email}
    </a>
  </p>
)}


          
          {/* File */}
          {project?.fileUrl && (
            <a
              href={project.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <MdFileDownload /> Project File (KML/KMZ)
            </a>
          )}

          {/* Image with improved styling */}
          <div className="overflow-hidden rounded-xl mt-3 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 rounded-xl"></div>
            <Image
              alt="project background"
              className="object-cover h-48 w-full transition-transform duration-300 hover:scale-105"
              src={imageUrl}
              onError={() => setImageError(true)}
            />
            
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ProjectCard;
