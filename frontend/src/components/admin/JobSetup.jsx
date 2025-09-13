import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setInitialLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const jobData = res.data.job;
          dispatch(setSingleJob(jobData));

          setInput({
            title: jobData.title || "",
            description: jobData.description || "",
            requirements: Array.isArray(jobData.requirements)
              ? jobData.requirements.join(", ")
              : "",
            salary: jobData.salary || "",
            location: jobData.location || "",
            jobType: jobData.jobType || "",
            experience: jobData.experienceLevel || "",
            position: jobData.position || 0,
            companyId: jobData.company?._id || "",
          });
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        toast.error(
          error.response?.data?.message || "Failed to load job data."
        );
        navigate("/admin/jobs");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      fetchJobData();
    }
  }, [id, dispatch, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company.");
      return;
    }

    try {
      setLoading(true);

      const requirementsArray = input.requirements
        .split(",")
        .map((req) => req.trim())
        .filter((req) => req !== "");

      const jobDataToUpdate = {
        title: input.title,
        description: input.description,
        requirements: requirementsArray,
        salary: input.salary,
        location: input.location,
        jobType: input.jobType,
        experienceLevel: input.experience,
        position: Number(input.position),
        company: input.companyId,
      };

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        jobDataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setSingleJob(res.data.updatedJob));
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        <p className="ml-2 text-gray-600">Loading job details...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md w-full"
          onSubmit={submitHandler}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Edit Job Posting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="requirements">
                Requirements (comma-separated)
              </Label>
              <Input
                id="requirements"
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="e.g., JavaScript, React, Node.js"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary (LPA)</Label>
              <Input
                id="salary"
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Input
                id="jobType"
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience Level (yrs)</Label>
              <Input
                id="experience"
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="position">No. of Positions</Label>
              <Input
                id="position"
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select
                onValueChange={(value) =>
                  setInput((prevInput) => ({
                    ...prevInput,
                    companyId: value,
                  }))
                }
                value={input.companyId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Companies</SelectLabel>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#7209b7] hover:bg-[#5f32ad]"
            >
              Update Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before updating a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditJob;
