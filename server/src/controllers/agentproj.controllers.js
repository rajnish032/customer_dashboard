import expressAsyncHandler from "express-async-handler";
import { AgentProject } from "../models/agent/projects.model.js";
import User from "../models/userSchema.js";
import { deleteKMLFromCloudinary, uploadKmlToCloudinary } from "../utils/cloudinary.js";
import { AgentPostJob } from "../models/agent/postJob.model.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";


export const addNewJob = expressAsyncHandler(async (req, res) => {
  const { title, subtitle, date, location, companyname, jobtype, salary, industrytype, category, jobsummary, phoneNumber,email } = req.body;

  if (!title || !subtitle || !date || !location || !companyname || !jobtype || !salary || !industrytype || !category || !jobsummary ||!phoneNumber ||!email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let companyLogoUrl = null;

  if (req.file) {
    try {
      const result = await uploadImageToCloudinary(req.file);
      companyLogoUrl = result.secure_url;
    } catch (error) {
      console.error("Logo upload failed:", error.message);
      return res.status(500).json({ message: "Failed to upload company logo" });
    }
  }

  try {
    const newJob = await AgentPostJob.create({
      userId: req.user._id,
      title,
      subtitle,
      date,
      location,
      companyname,
      companyLogo: companyLogoUrl,
      jobtype,
      salary,
      industrytype,
      category,
      jobsummary,
       phoneNumber,
      email
    });

    if (!newJob) {
      return res.status(500).json({ message: "Could not add job. Please try again" });
    }

    return res.status(201).json({
      message: "Job Added Successfully",
      job: newJob,
    });
  } catch (err) {
    console.error("Job creation error:", err.message);
    return res.status(500).json({ message: "Could not add job. Try again!", error: err.message });
  }
});



export const addNewProject = expressAsyncHandler(async (req, res) => {
  const { data } = req.body;
  const file = req.file;
  if (!data)
    return res.status(400).json({ message: "All Fields are required" });

  let projectData = JSON.parse(data);
  if (file) {
    try {
      const uploadedFile = await uploadKmlToCloudinary(file);
      projectData.fileUrl = uploadedFile.secure_url;
    } catch (error) {
      return res.status(500).json({ message: "Failed to upload KML/KMZ file" });
    }
  }
  const newProj = await AgentProject.create({
    userId: req.user._id,
    ...projectData,
  });
//   console.log(newProj);
  if (!newProj)
    return res
      .status(500)
      .json({ message: "Could not Add Project Please try again" });

  res.status(201).json({ message: "Project Added" });
});


export const deleteProj = expressAsyncHandler(async (req, res) => {
  const { projId } = req.params;

  if (!projId) {
    return res.status(400).json({ message: "Invalid Project" });
  }

  try {
    const project = await AgentProject.findById(projId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.fileUrl) {
      await deleteKMLFromCloudinary(project.fileUrl);
    }

    await AgentProject.findByIdAndDelete(projId);

    res.status(200).json({ message: "Project Deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ message: "Could not Delete Project. Please try again" });
  }
});

export const deleteJob = expressAsyncHandler(async (req, res) => {
  const { jobId } = req.params;
  if (!jobId) {
    return res.status(400).json({ message: "Invalid Job" });
  }
  try {
    const job = await AgentPostJob.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await AgentPostJob.findByIdAndDelete(jobId);

    res.status(200).json({ message: "Job Deleted" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Could not Delete Job. Please try again" });
  }
}
);

export const getAllJob = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) return res.status(401).json({ message: "Kindly Login" });
  const allJob = await AgentPostJob.find({ userId: _id });

  res.status(200).json({ allJob: allJob });
}); 



export const getAllProj = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) return res.status(401).json({ message: "Kindly Login" });
  const allProj = await AgentProject.find({ userId: _id });

  res.status(200).json({ allProj: allProj });
});

export const getAllPublicJob = expressAsyncHandler(async (req, res) => {
  const { uniqueId } = req.query;
  if (!uniqueId) return res.status(401).json({ message: "Kindly Provide Id" });
  const user = await User.findOne({ uniqueId });
  if (!user) return res.status(401).json({ message: "Invalid Id" });

  const allJob = await AgentPostJob.find({ userId: user._id });

  res.status(200).json({ allJob: allJob });
});

export const getAllPublicProj = expressAsyncHandler(async (req, res) => {
  const { uniqueId } = req.query;
  if (!uniqueId) return res.status(401).json({ message: "Kindly Provide Id" });
  const user = await User.findOne({ uniqueId });
  if (!user) return res.status(401).json({ message: "Invalid Id" });

  const allProj = await AgentProject.find({ userId: user._id });

  res.status(200).json({ allProj: allProj });
});







