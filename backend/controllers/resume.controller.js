import { Resume } from "../models/resume.model.js";

// Save or update Profile details
export const saveProfileDetails = async (req, res) => {
  const { userId } = req.params;
  const { profile } = req.body; // Profile data

  try {
    let resume = await Resume.findOne({ userId });

    if (!resume) {
      resume = new Resume({ userId, profile });
    } else {
      resume.profile = profile;
    }

    await resume.save();
    res
      .status(200)
      .json({ message: "Profile details saved successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving profile details" });
  }
};

// Save or update Education details
export const saveEducationDetails = async (req, res) => {
  const { userId } = req.params;
  const { education } = req.body; // Array of education entries

  try {
    let resume = await Resume.findOne({ userId });

    if (!resume) {
      resume = new Resume({ userId, education });
    } else {
      resume.education = education;
    }

    await resume.save();
    res
      .status(200)
      .json({ message: "Education details saved successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving education details" });
  }
};

// Save or update Projects details
export const saveProjectsDetails = async (req, res) => {
  const { userId } = req.params;
  const { projects } = req.body; // Array of projects

  try {
    let resume = await Resume.findOne({ userId });

    if (!resume) {
      resume = new Resume({ userId, projects });
    } else {
      resume.projects = projects;
    }

    await resume.save();
    res
      .status(200)
      .json({ message: "Projects details saved successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving projects details" });
  }
};

// Save or update Experience details
export const saveExperienceDetails = async (req, res) => {
  const { userId } = req.params;
  const { experiences } = req.body; // Array of experiences

  try {
    let resume = await Resume.findOne({ userId });

    if (!resume) {
      resume = new Resume({ userId, experiences });
    } else {
      resume.experiences = experiences;
    }

    await resume.save();
    res
      .status(200)
      .json({ message: "Experience details saved successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving experience details" });
  }
};

// Save or update Skills details
export const saveSkillsDetails = async (req, res) => {
  const { userId } = req.params;
  const { skills } = req.body; // Skills data

  try {
    let resume = await Resume.findOne({ userId });

    if (!resume) {
      resume = new Resume({ userId, skills });
    } else {
      resume.skills = skills;
    }

    await resume.save();
    res
      .status(200)
      .json({ message: "Skills details saved successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving skills details" });
  }
};

// Retrieve the resume details (GET request)
export const getResumeDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching resume details" });
  }
};
