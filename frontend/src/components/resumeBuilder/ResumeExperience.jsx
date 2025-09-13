import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Trash, ArrowRight, ArrowLeft, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ResumeNavbar from "./shared/ResumeNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setResumeData } from "@/redux/resumeSlice";
import axios from "axios";
import { RESUME_API_END_POINT } from "@/utils/constant";
import { Label } from "@/components/ui/label";

const ResumeExperience = () => {
  const { userId } = useParams();
  const { resumeData } = useSelector((store) => store.resume);
  const dispatch = useDispatch();

  const [experienceList, setExperienceList] = useState(
    resumeData?.experiences?.length ? resumeData.experiences : []
  );

  useEffect(() => {
    setExperienceList(
      resumeData?.experiences?.length ? resumeData.experiences : []
    );
  }, [resumeData]);

  const handleAddExperience = () => {
    setExperienceList((list) => [
      ...list,
      {
        tempId: Date.now().toString(),
        role: "",
        institute: "",
        desc: "",
        start_date: "",
        end_date: "",
      },
    ]);
  };

  const handleRemoveExperience = (id) => {
    setExperienceList((list) =>
      list.filter(
        (experience) => experience._id !== id && experience.tempId !== id
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setExperienceList((list) =>
      list.map((experience) =>
        experience._id === id || experience.tempId === id
          ? { ...experience, [field]: value }
          : experience
      )
    );
  };

  const handleSave = async () => {
    try {
      const updatedExperiences = experienceList.map(
        ({ tempId, ...rest }) => rest
      );

      const response = await axios.post(
        `${RESUME_API_END_POINT}/${userId}/experience`,
        { experiences: updatedExperiences },
        { withCredentials: true }
      );

      dispatch(setResumeData(response.data.resume));
      alert("Experience details updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save experience details.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 pt-20">
      <ResumeNavbar />
      <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl shadow-2xl  rounded-lg  backdrop-blur-sm border bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 p-6 mb-8">
          <CardHeader className="text-center py-4">
            <h2 className="text-3xl font-semibold text-gray-800">Experience</h2>
            <div className="w-[50%] h-1 bg-blue-700 mx-auto mt-2"></div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {experienceList.length === 0 ? (
              <div className="w-full bg-blue-50 border border-blue-400 text-blue-800 p-4 rounded text-center shadow-md">
                No experiences added yet. Click "Add Experience" to get started.
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-indigo-600 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
                    onClick={handleAddExperience}
                  >
                    <PlusCircle size={20} />
                    <span>Add Experience</span>
                  </Button>
                </div>
              </div>
            ) : (
              experienceList.map((experience, index) => {
                const key = experience._id || experience.tempId;
                return (
                  <Card
                    key={key}
                    className="w-full border bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 backdrop-blur-sm rounded-lg p-6  shadow-lg "
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        {`Experience ${index + 1}`}
                      </h3>

                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1 shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => handleRemoveExperience(key)}
                      >
                        <Trash size={16} />
                        <span>Remove</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`${key}-role`}
                          className="block text-gray-700 font-semibold"
                        >
                          Role
                        </Label>
                        <Input
                          id={`${key}-role`}
                          value={experience.role}
                          placeholder="Enter role"
                          onChange={(e) =>
                            handleInputChange(key, "role", e.target.value)
                          }
                          className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor={`${key}-institute`}
                          className="block text-gray-700 font-semibold"
                        >
                          Institute/Organisation
                        </Label>
                        <Input
                          id={`${key}-institute`}
                          value={experience.institute}
                          placeholder="Enter institute"
                          onChange={(e) =>
                            handleInputChange(key, "institute", e.target.value)
                          }
                          className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 col-span-full">
                        {" "}
                        {/* Span full width */}
                        <div className="space-y-2">
                          <Label
                            htmlFor={`${key}-start_date`}
                            className="block text-gray-700 font-semibold"
                          >
                            Start Date
                          </Label>
                          <Input
                            id={`${key}-start_date`}
                            type="date"
                            value={formatDate(experience.start_date)}
                            onChange={(e) =>
                              handleInputChange(
                                key,
                                "start_date",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`${key}-end_date`}
                            className="block text-gray-700 font-semibold"
                          >
                            End Date
                          </Label>
                          <Input
                            id={`${key}-end_date`}
                            type="date"
                            value={formatDate(experience.end_date)}
                            onChange={(e) =>
                              handleInputChange(key, "end_date", e.target.value)
                            }
                            className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-full">
                        {" "}
                        {/* Span full width */}
                        <Label
                          htmlFor={`${key}-desc`}
                          className="block text-gray-700 font-semibold"
                        >
                          Description
                        </Label>
                        <Textarea
                          id={`${key}-desc`}
                          value={experience.desc}
                          placeholder="Enter description"
                          onChange={(e) =>
                            handleInputChange(key, "desc", e.target.value)
                          }
                          className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </CardContent>

          {experienceList.length > 0 && (
            <div className="flex gap-4 items-center px-6 pb-6 justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
                onClick={handleSave}
              >
                Save Experience
              </Button>
              <Button
                onClick={handleAddExperience}
                variant="outline"
                className="flex items-center space-x-2 border-indigo-600 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
              >
                <PlusCircle size={20} />
                <span>Add Experience</span>
              </Button>
            </div>
          )}
        </div>

        <div className="mb-6 w-full max-w-4xl flex justify-between mt-8">
          <Link
            to={`/${userId}/resumebuilder/edit/projects-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition duration-100"
          >
            <ArrowLeft className="mr-2 size-5" />
            Project Section
          </Link>

          <Link
            to={`/${userId}/resumebuilder/edit/extra-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition duration-100"
          >
            Extra Details Section
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeExperience;
