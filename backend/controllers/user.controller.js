import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import sendMail from "../utils/mailer.js";
import { model } from "mongoose";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    sendMail(
      email,
      `Hello ${fullname},\n\nCongratulations! Your registration was successful.\n\nWelcome to our platform.\n\nBest Regards,\nCareerSpring Team`,
      "Registration Successful!"
    );

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      savedJobs: user.savedJobs,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Corrected from httpsOnly
        secure: true, // Render uses HTTPS
        sameSite: "none", // Allows cross-origin cookies
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    let cloudResponse;

    // cloudinary ayega idhar
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    } else {
      skillsArray = [];
    }

    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    user.profile.skills = skillsArray;

    //resume
    if (file) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveJobs = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found.",
        success: false,
      });
    }

    //check if job already saved
    const jobIdStr = jobId.toString();
    const isjobSaved = user.savedJobs.includes(jobIdStr);

    let message = "";

    //if already saved, remove it
    if (isjobSaved) {
      user.savedJobs = user.savedJobs.filter((id) => id.toString() != jobIdStr);
      message = "Job removed from saved jobs.";
    } else {
      //if not saved, add it
      user.savedJobs.push(jobId);
      message = "Job saved successfully.";
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate({
      path: "savedJobs",
      model: "Job",
      populate: {
        path: "company",
        model: "Company",
        select: "name",
      },
    });

    return res.status(200).json({
      message,
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId).populate({
      path: "savedJobs",
      model: "Job",
      populate: {
        path: "company",
        model: "Company",
        select: "name",
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Saved jobs retrieved successfully.",
      success: true,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    console.log(error);
  }
};
