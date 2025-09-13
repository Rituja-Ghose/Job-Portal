import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResumeNavbar from "./shared/ResumeNavbar";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RESUME_API_END_POINT } from "@/utils/constant";
import { setResumeData } from "@/redux/resumeSlice";

const ResumeEducation = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { resumeData } = useSelector((store) => store.resume);

  const [educationList, setEducationList] = useState(
    resumeData?.education?.length ? resumeData.education : []
  );

  useEffect(() => {
    setEducationList(resumeData?.education?.length ? resumeData.education : []);
  }, [resumeData]);

  const handleInputChange = (id, field, value) => {
    setEducationList((list) =>
      list.map((edu) =>
        edu._id === id || edu.tempId === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const handleAddEducation = () => {
    setEducationList((list) => [
      ...list,
      {
        tempId: Date.now().toString(),
        college: "",
        degree: "",
        field: "",
        branch: "",
        startYear: "",
        endYear: "",
        city: "",
        grades: "",
      },
    ]);
  };

  const handleRemoveEducation = (id) => {
    setEducationList((list) =>
      list.filter((edu) => edu._id !== id && edu.tempId !== id)
    );
  };

  const handleSave = async () => {
    try {
      const payload = educationList.map(({ tempId, ...rest }) => rest);
      const { data } = await axios.post(
        `${RESUME_API_END_POINT}/${userId}/education`,
        { education: payload },
        { withCredentials: true }
      );

      dispatch(setResumeData(data.resume));
      alert("Education details updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save education details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 pt-20">
      <ResumeNavbar />
      <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        {educationList.length === 0 ? (
          <div className="w-full max-w-4xl bg-blue-100 border border-blue-400 text-blue-800 p-4 rounded text-center shadow-md">
            No education added yet. Click "Add Education" to get started.
          </div>
        ) : (
          educationList.map((education, index) => {
            const key = education._id || education.tempId;
            return (
              <Card
                key={key}
                className="w-full max-w-4xl shadow-2xl  rounded-lg bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 backdrop-blur-sm border border-blue-00 p-6 mb-8"
              >
                <CardHeader className="text-center py-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Educational Details {index + 1}
                  </h2>
                  <div className="w-24 h-1 bg-blue-700 mx-auto mt-2"></div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(education).map(([field, value]) =>
                      field === "_id" || field === "tempId" ? null : (
                        <div key={field} className="space-y-2">
                          <Label
                            htmlFor={`${key}-${field}`}
                            className="block text-gray-700 font-semibold capitalize"
                          >
                            {field.replace(/([A-Z])/g, " $1")}
                          </Label>
                          <Input
                            id={`${key}-${field}`}
                            value={value}
                            onChange={(e) =>
                              handleInputChange(key, field, e.target.value)
                            }
                            className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleRemoveEducation(key)}
                      variant="destructive"
                      size="sm"
                      className="flex items-center space-x-2 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}

        <div className="flex gap-4 w-full max-w-4xl justify-center mt-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
            onClick={handleSave}
          >
            Save Education
          </Button>
          <Button
            onClick={handleAddEducation}
            variant="outline"
            className="flex items-center space-x-2 border-indigo-600 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
          >
            <Plus size={20} />
            <span>Add Education</span>
          </Button>
        </div>

        <div className="mb-6 w-full max-w-4xl flex justify-between mt-8">
          <Link
            to={`/${userId}/resumebuilder/edit/personal-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105"
          >
            <ArrowLeft className="mr-2 size-5" />
            Profile Section
          </Link>
          <Link
            to={`/${userId}/resumebuilder/edit/projects-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105"
          >
            Project Section
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeEducation;
