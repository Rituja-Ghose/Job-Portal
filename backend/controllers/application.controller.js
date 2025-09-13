import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import sendMail from "../utils/mailer.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this jobs",
        success: false,
      });
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    // ✅ Fetch user data to send email
    const user = await User.findById(userId).select("email fullname"); // Fetch user email and name
    const jobCompany = await Company.findById(job.company).select("name");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Prepare email subject and message
    const subject = `Application Submitted for ${job.title}`;
    const message = `Dear ${user.fullname},\n\nYou have successfully applied for the position of ${job.title} at ${jobCompany.name}.\n\nThank you, ${user.fullname}. We appreciate your interest and wish you the best of luck!\n\nBest Regards,\nCareerSpring Team`;

    // Send email to the user
    sendMail(user.email, message, subject);

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      succees: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // find the application by applicantion id
    const application = await Application.findOne({
      _id: applicationId,
    })
      .populate("applicant", "email fullname")
      .populate({
        path: "job",
        select: "title",
        populate: {
          path: "company",
          select: "name",
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update the status
    application.status = status;
    await application.save();

    // send mail functionality
    const userName = application.applicant.fullname;
    const userEmail = application.applicant.email;
    const appliedCompany = application.job.company.name;
    const appliedJobTitle = application.job.title;

    let subject, message;
    if (status.toLowerCase() === "accepted") {
      subject = `🎉 Congratulations! You've been accepted for ${appliedJobTitle}`;
      message = `Dear ${userName},\n\n🌟 We are thrilled to inform you that your application for the position of <b>${appliedJobTitle}</b> at <b>${appliedCompany}</b> has been <b>accepted</b>. Our team will be reaching out to you with the next steps shortly.\n\n🎊 Congratulations and welcome aboard!\n\nBest Regards,\nCareerSpring Team 🚀`;
    } else if (status.toLowerCase() === "rejected") {
      subject = `🔍 Application Update for ${appliedJobTitle}`;
      message = `Dear ${userName},\n\n🙏 We appreciate your interest in the <b>${appliedJobTitle}</b> position at <b>${appliedCompany}</b>. Unfortunately, after careful consideration, we will not be moving forward with your application at this time.\n\n💡 We encourage you to apply for future openings that match your skills and experience.\n\nBest of luck in your job search!\n\nSincerely,\nCareerSpring Team 🤝`;
    }

    sendMail(userEmail, message, subject);

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
