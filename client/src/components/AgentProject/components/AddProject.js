"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { reqUrl } from "@/utils/constants";
import RequiredStar from "@/components/smallComponents/RequiredStar";

const AddProject = ({ setIsOpen, getAllProj, setAgentProj }) => {
  const cookies = new Cookies();

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    location: "",
    title: "",
    tag: "",
    rangeCovered: "",
    status: "",
    type: "linear videography",
    objective: "",
    industry: "Solar",
    application: "Surveying",
    tools: "Phantom-4-pro",
    scope: "",
    budget: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loader, setLoader] = useState(false);

 // const tags = ["Solar", "Tower", "Building", "Construction"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.tag) {
    //   toast.error("Tag is required");
    //   return;
    // }
    if (Number(formData.rangeCovered) <= 0) {
      toast.error("Range Covered must be a positive number");
      return;
    }
    if (formData.endDate < formData.startDate) {
      toast.error("End Date cannot be before Start Date");
      return;
    }

    const token = cookies.get("auth");
    if (!token) {
      toast.error("You are unauthorized. Kindly login!");
      return;
    }

    try {
      setLoader(true);

      const cleanData = { ...formData };
      if (!cleanData.status) delete cleanData.status;
      cleanData.rangeCovered = Number(cleanData.rangeCovered);

      const sendData = new FormData();
      sendData.append("data", JSON.stringify(cleanData));
      if (selectedFile) sendData.append("file", selectedFile);

      await axios.post(`${reqUrl}/agent/project/new`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Project Added");

      setFormData({
        startDate: "",
        endDate: "",
        location: "",
        title: "",
        tag: "",
        rangeCovered: "",
        status: "",
        type: "linear videography",
        objective: "",
        industry: "Solar",
        application: "Surveying",
        tools: "Phantom-4-pro",
        scope: "",
        budget: "",
      });
      setSelectedFile(null);

      getAllProj?.(setAgentProj);
      setIsOpen?.(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not add project. Try again!");
    } finally {
      setLoader(false);
    }
  };

  const inputClass =
    "p-2 w-full rounded border border-gray-300 focus:outline-none  bg-gray-50";

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add Project</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Project Title <RequiredStar />
            </label>
            <input name="title" value={formData.title} required placeholder="Project Title"
              className={inputClass} onChange={handleChange} />
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Project Objective <RequiredStar />
            </label>
            <input name="objective" value={formData.objective} required placeholder="Project Objective"
              className={inputClass} onChange={handleChange} />
          </div>
        </div>

        {/* Industry & Application */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Industry <RequiredStar /></label>
            <select name="industry" value={formData.industry} onChange={handleChange} className={inputClass} required>
              <option>Solar</option>
              <option>Wind</option>
              <option>Construction</option>
              <option>Railways</option>
              <option>Agriculture</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-gray-700">Application <RequiredStar /></label>
            <select name="application" value={formData.application} onChange={handleChange} className={inputClass} required>
              <option>Surveying</option>
              <option>Mapping</option>
              <option>Inspection</option>
              <option>Surveillance</option>
              <option>Others</option>
            </select>
          </div>
        </div>

        {/* Mission & Range */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Mission Type <RequiredStar /></label>
            <select name="type" value={formData.type} onChange={handleChange} className={inputClass} required>
              <option value="linear videography">Linear VideoGraphy</option>
              <option value="linear mapping">Linear Mapping</option>
              <option value="area videography">Area VideoGraphy</option>
              <option value="area mapping">Area Mapping</option>
              <option value="vertical videography">Vertical VideoGraphy</option>
              <option value="vertical mapping">Vertical Mapping</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-gray-700">
              {formData.type.includes("linear") ? "Distance in Km" : "Area Size (acres/km²)"} <RequiredStar />
            </label>
            <input name="rangeCovered" type="number" min={1} value={formData.rangeCovered}
              placeholder="Enter value" className={inputClass} onChange={handleChange} required />
          </div>
        </div>

        {/* Tag & Budget */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* <div>
            <label className="font-medium text-gray-700">Tag <RequiredStar /></label>
            <select name="tag" value={formData.tag} onChange={handleChange} className={inputClass} required>
              <option value="" disabled>Select a tag</option>
              {tags.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div> */}
          <div>
            <label className="font-medium text-gray-700">Budget <RequiredStar /></label>
            <input name="budget" type="number" value={formData.budget} placeholder="₹ 0.00"
              className={inputClass} onChange={handleChange} required />
          </div>
        </div>

        {/* Tools & Scope */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Tools <RequiredStar /></label>
            <select name="tools" value={formData.tools} onChange={handleChange} className={inputClass} required>
              <option>Phantom-4-pro</option>
              <option>Trimble-Geo-7X</option>
              <option>Leica-Zeno-20</option>
              <option>Topcon-HiPer-VR</option>
              <option>Emlid-Reach-RS2</option>
              <option>Hemisphere-AtlasLink</option>
              <option>Spectra-Precision-MobileMapper-120</option>
              <option>South-Galaxy-G1</option>
              <option>Trimble-TSC7-Controller</option>
              <option>Panasonic-Toughpad-FZ-G1</option>
              <option>Leica-TS16</option>
              <option>Topcon-GT-Series</option>
              <option>LiDAR-Sensors</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-gray-700">Scope & Result <RequiredStar /></label>
            <textarea name="scope" rows={3} value={formData.scope} placeholder="Enter details"
              className={inputClass} onChange={handleChange} required />
          </div>
        </div>

        {/* Location & File */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Project Place</label>
            <input name="location" value={formData.location} placeholder="Place/Location"
              className={inputClass} onChange={handleChange} required />
          </div>
          <div>
            <label className="font-medium text-gray-700">Upload File (KML/KMZ)</label>
            <input type="file" accept=".kml,.kmz" onChange={handleFileChange} className="block w-full text-sm text-gray-600" />
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Start Date <RequiredStar /></label>
            <input type="date" name="startDate" value={formData.startDate} className={inputClass} onChange={handleChange} required />
          </div>
          <div>
            <label className="font-medium text-gray-700">End Date <RequiredStar /></label>
            <input type="date" name="endDate" value={formData.endDate} className={inputClass} onChange={handleChange} required />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button type="submit" disabled={loader}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50">
            {loader ? "Adding..." : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;


