import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/savejob/get`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const data = response.data;
        if (data.success) {
          setSavedJobs(data.savedJobs);
        }
      } catch (error) {
        console.log("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-left"}>Job Role</TableHead>
            <TableHead className={"text-left"}>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedJobs.length > 0 &&
            savedJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SavedJobs;
