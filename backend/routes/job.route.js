import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJob,
} from "../controllers/job.controller.js";
import { getSavedJobs, saveJobs } from "../controllers/user.controller.js";

const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/savejob").post(isAuthenticated, saveJobs);
router.route("/savejob/get").get(isAuthenticated, getSavedJobs);
router.route("/update/:id").put(isAuthenticated, updateJob);

export default router;
