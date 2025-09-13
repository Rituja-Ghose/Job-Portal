import express from "express";
import {
  getResumeDetails,
  saveEducationDetails,
  saveExperienceDetails,
  saveProfileDetails,
  saveProjectsDetails,
  saveSkillsDetails,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/:userId/profile", saveProfileDetails);

router.post("/:userId/education", saveEducationDetails);

router.post("/:userId/projects", saveProjectsDetails);

router.post("/:userId/experience", saveExperienceDetails);

router.post("/:userId/skills", saveSkillsDetails);

router.get("/:userId", getResumeDetails);

export default router;
