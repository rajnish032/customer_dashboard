

"use client";
import React, { useState } from "react";
import { IoLocation, IoPricetag } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { TbDeviceRemote } from "react-icons/tb";
import { GiDeliveryDrone } from "react-icons/gi";
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
          
      <Card className="relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border rounded-xl overflow-hidden ">
        {/* Header */}
        <CardHeader className="flex justify-between items-start p-4 bg-gray-50 border-b">
          <div>
            <h4 className="font-bold text-xl">{project?.title}</h4>
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {project?.industry}
              </span>
              <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {project?.application}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                project?.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {project?.status?.replace(project?.status[0], project?.status[0].toUpperCase())}
            </span>
            <TiDelete
              onClick={() => handleDelete(projId)}
              className="text-md cursor-pointer w-fit h-fit inline-block  text-red-600 hover:text-red-700"
              />
          </div>
        </CardHeader>

        {/* Body */}
        <CardBody className="p-4 space-y-3">
          {/* Location */}
          <p className="text-sm flex items-center gap-2 text-gray-600">
            <IoLocation /> {project?.location}
          </p>
          {/* Type */}
          <p className="text-sm flex items-center gap-2 text-gray-600">
            <TbDeviceRemote /> {project?.type}
          </p>
          {/* Range */}
          <p className="text-sm flex items-center gap-2 text-gray-600">
            <GiDeliveryDrone /> {project?.rangeCovered}
            {project?.type?.toLowerCase().includes("linear") ? " km" : " acres"}
          </p>
          {/* Budget */}
          {project?.budget && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <IoPricetag /> ₹{project?.budget.toLocaleString()}
            </p>
          )}
          {/* Dates */}
          <p className="text-xs flex items-center gap-2 text-gray-500">
            <FaClockRotateLeft /> {formatDate(project?.startDate)} - {formatDate(project?.endDate)}
          </p>
          {/* Description */}
          {project?.description && (
            <p className="text-sm text-gray-700 line-clamp-3">{project?.description}</p>
          )}
          {/* File */}
          {project?.fileUrl && (
            <a
              href={project.fileUrl}
              download
              target="_blank"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <MdFileDownload /> Download File
            </a>
          )}

          {/* Image */}
          <div className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl "
              src={imageUrl}
              width={270}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ProjectCard;
