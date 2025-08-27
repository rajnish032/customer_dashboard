"use client";
import React, { useState } from "react";
import { IoLocation, IoPricetag, IoBusiness } from "react-icons/io5";
import { FaClockRotateLeft, FaUserTie } from "react-icons/fa6";
import { Card, CardHeader, CardBody, Image, Avatar } from "@nextui-org/react";
import { TiDelete } from "react-icons/ti";
import { IoIosPeople } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import dayjs from "dayjs";
import DelModal from "../../smallComponents/DelModal";

const industryImages = {
  Drone_Pilot: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523457/6692f7ec62b53e48c07aa510cd3fdf16_npxmcn.jpg",
  Geospatial: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523860/2a5d9552856098222ca2c36b7d793102_nrbymx.jpg",
  Surveying: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745524173/original_1_w4tami.jpg",
  Other: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745524095/irri-bbm-rice-drone-demo-2-9d108c-1024_mnbmxs.jpg",
};

// Default company logo for fallback
const defaultCompanyLogo = "https://img.freepik.com/premium-vector/company-icon-simple-element-illustration-company-concept-symbol-design-from-abstract-collection_500223-130.jpg";

const JobCard = ({ job, jobId, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const formatDate = (date) => date ? dayjs(date).format("DD/MM/YYYY") : "";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmDelete = () => {
    handleDelete(jobId);
    closeModal();
  };

  // Get the correct industry image
  const industryImageUrl = industryImages[job?.industrytype] || industryImages["Other"];
  const companyLogo = job?.companyLogo && !logoError ? job.companyLogo : defaultCompanyLogo;

  return (
     <>
      <DelModal isOpen={isModalOpen} handleDelete={confirmDelete} handleClose={closeModal} />
          
      <Card className="relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border rounded-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <CardHeader className="flex justify-between items-start p-4 bg-gray-50 border-b">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Avatar
                src={companyLogo}
                className="w-10 h-10 flex-shrink-0"
                onError={() => setLogoError(true)}
              />
              <div>
                <h4 className="font-bold text-xl">{job?.title}</h4>
                <p className="text-sm flex items-center gap-2 text-gray-600 mt-1">
                  <IoBusiness /> {job?.companyname}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {job?.industrytype}
              </span>
              
              <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {job?.category}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TiDelete
              onClick={() => handleDelete(jobId)}
              className="text-xl cursor-pointer text-red-600 hover:text-red-700 mt-1"
            />
          </div>
        </CardHeader>

        {/* Body */}
        <CardBody className="p-4 space-y-3">

          <p className="text-sm flex items-center gap-2 text-gray-600">
               <IoIosPeople/> Job Type: {job?.jobtype}
              </p>
          {/* Location */}
          <p className="text-sm flex items-center gap-2 text-gray-600">
            <IoLocation /> Location: {job?.location}
          </p>

          
          {/* Salary */}
          {job?.salary && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <IoPricetag /> Salary: {job?.salary}
            </p>
          )}
          
          {/* Subtitle (Skills/Keywords) */}
          {job?.subtitle && (
            <p className="text-sm flex items-center gap-2 text-gray-600">
              <FaUserTie /> Subtitle: {job?.subtitle}
            </p>
          )}
          
          {/* Application Deadline */}
          {job?.date && (
            <p className="text-xs flex items-center gap-2 text-gray-500">
              <FaClockRotateLeft /> Apply by: {formatDate(job?.date)}
            </p>
          )}
          
          {/* Job Summary */}
          {job?.jobsummary && (
            <p className="text-sm text-gray-700 line-clamp-3">{job?.jobsummary}</p>
          )}
          
          {job?.phoneNumber && (
  <p className="text-sm text-gray-700 line-clamp-3">
    Phone No :{" "}
    <a href={`tel:${job?.phoneNumber}`} className="text-blue-600 underline">
      {job?.phoneNumber}
    </a>
  </p>
)}

{job?.email && (
  <p className="text-sm text-gray-700 line-clamp-3">
    Send CV/Resume here :{" "}
    <a href={`mailto:${job?.email}`} className="text-blue-600 underline">
      {job?.email}
    </a>
  </p>
)}


        </CardBody>
      </Card>
    </>
  );
};

export default JobCard;