import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { toggleSavedJob } from "@/redux/authSlice";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  const [isJobCurrentlySaved, setIsJobCurrentlySaved] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const onSaveHandler = async () => {
    if (!job?._id) {
      console.error("Job ID is not available");
      return;
    }

    try {
      const response = await axios.post(
        `${JOB_API_END_POINT}/savejob`,
        {
          jobId: job._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.success) {
        dispatch(toggleSavedJob(job._id));
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error saving/unsaving job:", error);
    }
  };

  useEffect(() => {
    if (user && user.savedJobs && job?._id) {
      setIsJobCurrentlySaved(user.savedJobs.includes(job._id));
    } else {
      setIsJobCurrentlySaved(false);
    }
  }, [user?.savedJobs, job?._id]);

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="@shadcn" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button
          className={
            isJobCurrentlySaved
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-[#7209b7]"
          }
          onClick={onSaveHandler}
        >
          {isJobCurrentlySaved ? "Saved" : "Save for Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
