import express from "express";
import { Job } from "../models/job.model.js";
import cosineSimilarity from "../utils/similarity.js";

const router = express.Router();

const getSkillVector = (inputSkills, dictionary) => {
  const cleanedInputSkills = inputSkills.map((s) => s.toLowerCase().trim());
  return dictionary.map((skill) =>
    cleanedInputSkills.includes(skill) ? 1 : 0
  );
};

router.post("", async (req, res) => {
  try {
    // console.log("Received req.body:", req.body);

    const userSkills = req.body || [];
    if (!Array.isArray(userSkills) || !userSkills.length) {
      // console.log("Error: User skills not provided or not in expected array format.");
      return res.status(400).json({
        error:
          "No user skills provided or skills not in expected array format.",
      });
    }
    // console.log("User Skills (processed):", userSkills);

    const jobs = await Job.find().populate("company");

    // console.log("Number of jobs found in DB:", jobs.length);

    if (jobs.length === 0) {
      // console.log("CRITICAL: No jobs found in the database. Please ensure your 'Job' collection is populated with documents.");
      return res.status(200).json([]);
    }

    // console.log("Inspecting requirements for first 3 jobs (if available):");
    // jobs.slice(0, 3).forEach((job, index) => {
    //   console.log(`  Job ${index + 1} Title: ${job.title || "N/A"}`);
    //   console.log(`  Job ${index + 1} Requirements:`, job.requirements);
    //   if (!Array.isArray(job.requirements)) {
    //     console.log(
    //       `  WARNING: Job ${
    //         index + 1
    //       } 'requirements' is not an array! It's type: ${typeof job.requirements}`
    //     );
    //   } else if (job.requirements.length === 0) {
    //     console.log(
    //       `  WARNING: Job ${index + 1} 'requirements' array is empty.`
    //     );
    //   }
    // });

    const allRequirements = [
      ...new Set(
        jobs.flatMap((job) => {
          if (Array.isArray(job.requirements)) {
            return job.requirements.map((r) => r.toLowerCase().trim());
          }
          return [];
        })
      ),
    ];

    // console.log("All unique requirements (dictionary):", allRequirements);

    if (allRequirements.length === 0) {
      // console.log("CRITICAL: 'allRequirements' is still empty. This confirms that either no jobs have requirements, or the requirements are not in the expected format (e.g., not arrays of strings).");
      return res.status(200).json([]); // Return empty if no dictionary can be built
    }

    const userVector = getSkillVector(userSkills, allRequirements);
    // console.log("User Vector:", userVector);
    if (userVector.every((val) => val === 0) && allRequirements.length > 0) {
      // console.log("WARNING: User vector is all zeros. This means none of the user's skills match any skills in the 'allRequirements' dictionary.");
      // console.log("Double-check spelling/casing of user skills vs. job requirements.");
      return res.status(200).json([]); // Return empty if no user skills match dictionary
    }

    const matches = jobs
      .map((job) => {
        const jobRequirements = Array.isArray(job.requirements)
          ? job.requirements
          : [];
        const jobVector = getSkillVector(jobRequirements, allRequirements);
        const score = cosineSimilarity(userVector, jobVector);

        return {
          ...job.toObject(),
          score,
        };
      })
      .filter((job) => job.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // console.log("Final Matches to be sent:", matches);
    res.json(matches);
  } catch (err) {
    console.error("Error generating suggestions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
