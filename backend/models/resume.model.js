import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true },
  address: { type: String, required: true },
  linkedin: { type: String },
  github: { type: String },
  leetcode: { type: String },
});

const educationSchema = new mongoose.Schema({
  college: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String },
  branch: { type: String },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  city: { type: String },
  grades: { type: String },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, default: "" },
  techstack: { type: [String], required: true },
});

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  institute: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  desc: { type: String },
});

const skillsSchema = new mongoose.Schema({
  languages: { type: [String], default: [] },
  web: { type: [String], default: [] },
  webFrameworks: { type: [String], default: [] },
  databases: { type: [String], default: [] },
  other: { type: [String], default: [] },
});

// Main Resume Schema
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profile: profileSchema,
    education: [educationSchema], // Array to support multiple educations
    projects: [projectSchema], // Array to support multiple projects
    experiences: [experienceSchema], // Array to support multiple experiences
    skills: skillsSchema,
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
