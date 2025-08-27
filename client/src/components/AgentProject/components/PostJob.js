"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { reqUrl } from "@/utils/constants";
import RequiredStar from "@/components/smallComponents/RequiredStar";

const AddJob = ({ setIsOpen, getAllJob, setAgentJob }) => {
  const cookies = new Cookies();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    date: "",
    location: "",
    companyname: "",
    jobtype: "",
    salary: "",
    industrytype: "Drone_Pilot",
    category: "Full-time",
    jobsummary: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setSelectedFile(file);
    
    // Create preview for image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

   const validateInputs = () => {
    // Phone number: only digits, 10 digits (India format example)
    const phoneRegex = /^[0-9]{10}$/;
    // Email: basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (new Date(formData.date) < new Date()) {
      toast.error("Job date cannot be in the past");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!validateInputs()) return;

    const token = cookies.get("auth");
    if (!token) {
      toast.error("You are unauthorized. Kindly login!");
      return;
    }

    try {
      setLoader(true);
      const sendData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        sendData.append(key, formData[key]);
      });
      
      // Append the company logo if selected
      if (selectedFile) {
        sendData.append("companyLogo", selectedFile);
      }

      await axios.post(`${reqUrl}/agent/postjob/new`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      
      toast.success("Job Posted Successfully");
      
      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        date: "",
        location: "",
        companyname: "",
        jobtype: "",
        salary: "",
        industrytype: "Drone_Pilot",
        category: "Full-time",
         phoneNumber: "",
         email: "",
        jobsummary: "",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Refresh jobs list if callback provided
      getAllJob?.(setAgentJob);
      setIsOpen?.(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not post job. Try again!");
    } finally {
      setLoader(false);
    }
  };

  const inputClass = "p-2 w-full rounded border border-gray-300 focus:outline-none bg-gray-50";
  const industries = ["Drone_Pilot", "Geospatial", "Surveying", "Others"];
  const categories = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];

  return (
    <div >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Post New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title & Subtitle */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Job Title <RequiredStar />
            </label>
            <input
              name="title"
              value={formData.title}
              required
              placeholder="e.g. Senior Frontend Developer"
              className={inputClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Job Subtitle <RequiredStar />
            </label>
            <input
              name="subtitle"
              value={formData.subtitle}
              required
              placeholder="e.g. React, Next.js, TypeScript"
              className={inputClass}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Company Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Company Name <RequiredStar />
            </label>
            <input
              name="companyname"
              value={formData.companyname}
              required
              placeholder="Company Name"
              className={inputClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Company Logo</label>
            <div className="flex items-center">
              {previewUrl ? (
                <div className="relative mr-3">
                  <img src={previewUrl} alt="Company logo preview" className="h-12 w-12 object-contain border rounded" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-12 w-12 border-2 border-dashed border-gray-300 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Job Type & Industry */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Job Type <RequiredStar />
            </label>
            <input
              name="jobtype"
              value={formData.jobtype}
              required
              placeholder="Job Type"
              className={inputClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Industry Type <RequiredStar />
            </label>
            <select
              name="industrytype"
              value={formData.industrytype}
              onChange={handleChange}
              className={inputClass}
              required
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary & Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Salary <RequiredStar />
            </label>
            <input
              name="salary"
              value={formData.salary}
              required
              placeholder="e.g. $80,000 - $100,000 per year"
              className={inputClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Category <RequiredStar />
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location & Date */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Location <RequiredStar />
            </label>
            <input
              name="location"
              value={formData.location}
              required
              placeholder="e.g. Remote, New York, NY, etc."
              className={inputClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Application Deadline <RequiredStar />
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              className={inputClass}
              onChange={handleChange}
              required
            />
          </div>
        </div>

         {/* Phone Number & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Phone Number <RequiredStar />
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              required
              placeholder="Enter 10-digit phone number"
              className={inputClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Email <RequiredStar />
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              placeholder="Enter valid email address"
              className={inputClass}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Job Summary */}
        <div>
          <label className="font-medium text-gray-700">
            Job Summary <RequiredStar />
          </label>
          <textarea
            name="jobsummary"
            rows={4}
            value={formData.jobsummary}
            placeholder="Describe the role, responsibilities, and requirements..."
            className={inputClass}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loader}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50 mb-5"
          >
            {loader ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;