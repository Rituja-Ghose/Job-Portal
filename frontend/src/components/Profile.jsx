import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs.jsx";
import SavedJobs from "./SavedJobs";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  useGetAppliedJobs();

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg my-8 p-8 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 md:h-32 md:w-32 border-2 border-primary">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-extrabold text-3xl text-gray-900 leading-tight">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                {user?.profile?.bio || "No bio yet."}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right shadow-md mt-4 md:mt-0 px-6 py-3 rounded-lg flex items-center gap-2"
            variant="outline"
          >
            <Pen className="w-5 h-5" />
            Edit Profile
          </Button>
        </div>

        <div className="h-px bg-gray-200 my-6"></div>

        <div className="mb-8">
          <h2 className="font-bold text-xl text-gray-800 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="w-5 h-5 text-gray-500" />
              <span>{user?.phoneNumber || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Replaced Separator with a styled div */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="font-bold text-xl text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 text-base font-semibold rounded-full transition-colors duration-200"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 italic">No skills added yet.</span>
            )}
          </div>
        </div>

        {/* Replaced Separator with a styled div */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-2 mb-8">
          <Label className="text-xl font-bold text-gray-800">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center gap-2 text-base transition-colors duration-200"
            >
              <FileText className="w-5 h-5" />
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-500 italic">No resume uploaded.</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-white shadow-lg p-8 md:p-10 my-8">
        <h1 className="font-bold text-2xl text-gray-800 mb-6">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Saved Jobs Section */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-white shadow-lg p-8 md:p-10 my-8">
        <h1 className="font-bold text-2xl text-gray-800 mb-6">Saved Jobs</h1>
        <SavedJobs />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
