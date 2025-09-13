import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react"; // Import ArrowLeft
import ResumeNavbar from "./shared/ResumeNavbar";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RESUME_API_END_POINT } from "@/utils/constant";
import { setResumeData } from "@/redux/resumeSlice";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";
import leetcodeIcon from "../../assets/leetcode.png";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label"; // Ensure Label is imported

const ResumeProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { resumeData } = useSelector((store) => store.resume);

  // Default structure for profile if none exists
  const defaultProfile = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
    linkedin: "",
    github: "",
    leetcode: "",
  };

  //local state for profile data
  const [profile, setProfile] = useState(resumeData?.profile || defaultProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const saveHandler = async () => {
    try {
      const response = await axios.post(
        `${RESUME_API_END_POINT}/${userId}/profile`,
        { profile },
        { withCredentials: true }
      );

      dispatch(setResumeData(response.data.resume));
      alert("Profile details updated successfully!");
    } catch (error) {
      console.error("Error updating profile details:", error.message);
      alert("Failed to update profile details.");
    }
  };

  return (
    // Apply the same background gradient as the home page
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 pt-20">
      {" "}
      <ResumeNavbar />
      <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="w-full max-w-4xl shadow-2xl  transition-all duration-300 ease-out rounded-lg bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 backdrop-blur-sm border  p-6">
          {" "}
          <div className="text-center mb-10">
            {/* Adjusted heading color */}
            <h2 className="text-3xl font-semibold text-gray-800">
              Personal Details
            </h2>
            {/* Short line below heading */}
            <div className="w-24 h-1 bg-blue-700 mx-auto mt-2"></div>{" "}
            {/* Adjusted line width and color */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}

            <div className="space-y-2">
              <Label
                htmlFor="firstname"
                className="block text-gray-700 font-semibold capitalize"
              >
                First Name
              </Label>

              <Input
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                name="firstname"
                id="firstname"
                value={profile.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lastname"
                className="block text-gray-700 font-semibold capitalize"
              >
                Last Name
              </Label>
              <Input
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500" // bg-white provides contrast
                name="lastname"
                id="lastname" // Link label to input
                value={profile.lastname}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block text-gray-700 font-semibold capitalize"
              >
                Email
              </Label>
              <Input
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500" // bg-white provides contrast
                name="email"
                id="email" // Link label to input
                value={profile.email}
                onChange={handleChange}
                type="email"
              />
            </div>

            {/* Mobile Field */}
            <div className="space-y-2">
              <Label
                htmlFor="mobile"
                className="block text-gray-700 font-semibold capitalize"
              >
                Mobile
              </Label>
              <Input
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500" // bg-white provides contrast
                name="mobile"
                id="mobile" // Link label to input
                value={profile.mobile}
                onChange={handleChange}
                type="tel"
              />
            </div>

            {/* Address Field */}
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="address"
                className="block text-gray-700 font-semibold capitalize"
              >
                Address
              </Label>
              <Textarea
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500" // bg-white provides contrast
                name="address"
                id="address" // Link label to input
                value={profile.address}
                onChange={handleChange}
              />
            </div>

            {/* LinkedIn Field with Icon */}
            <div className="space-y-2">
              {/* Label Styling with Icon: Uses flex to align icon and text */}
              <Label
                htmlFor="linkedin"
                className="flex items-center text-gray-700 font-semibold capitalize"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn icon"
                  className="h-5 w-5 mr-2" // Icon size and spacing
                />
                LinkedIn
              </Label>
              <Input
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500" // bg-white provides contrast
                name="linkedin"
                id="linkedin" // Link label to input
                value={profile.linkedin}
                onChange={handleChange}
              />
            </div>

            {/* GitHub Field with Icon */}
            <div className="space-y-2">
              <Label
                htmlFor="github"
                className="flex items-center text-gray-700 font-semibold capitalize"
              >
                <img
                  src={githubIcon}
                  alt="GitHub icon"
                  className="h-5 w-5 mr-2" // Icon size and spacing
                />
                GitHub
              </Label>
              <Input
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500" // bg-white provides contrast
                name="github"
                id="github" // Link label to input
                value={profile.github}
                onChange={handleChange}
              />
            </div>

            {/* LeetCode Field with Icon */}
            <div className="space-y-2">
              <Label
                htmlFor="leetcode"
                className="flex items-center text-gray-700 font-semibold capitalize"
              >
                <img
                  src={leetcodeIcon}
                  alt="LeetCode icon"
                  className="h-5 w-5 mr-2" // Adjust size/spacing as needed
                />
                LeetCode
              </Label>
              <Input
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500" // bg-white provides contrast
                name="leetcode"
                id="leetcode" // Link label to input
                value={profile.leetcode}
                onChange={handleChange}
              />
            </div>
          </div>{" "}
          {/* End grid */}
          {/* Save Button - Matches button style on Home page */}
          <Button
            className={
              "bg-blue-600 hover:bg-blue-700 text-white mt-8 shadow-md hover:shadow-lg transition-shadow"
            } // Button primary color and shadow
            onClick={saveHandler}
          >
            Save
          </Button>
        </div>
        {/* Navigation Links - Matches button/card style on Home page */}
        <div className="mb-6 w-full max-w-4xl flex justify-end mt-8">
          {" "}
          <Link
            to={`/${userId}/resumebuilder/edit/education-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105"
          >
            Education Section
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeProfile;
