import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Trash, PlusCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ResumeNavbar from "./shared/ResumeNavbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setResumeData } from "@/redux/resumeSlice";
import { RESUME_API_END_POINT } from "@/utils/constant";
import { Label } from "@/components/ui/label";

const ResumeProjects = () => {
  const { userId } = useParams();
  const { resumeData } = useSelector((store) => store.resume);
  const dispatch = useDispatch();

  const [projectList, setProjectList] = useState(
    resumeData?.projects?.length ? resumeData.projects : []
  );

  useEffect(() => {
    setProjectList(resumeData?.projects?.length ? resumeData.projects : []);
  }, [resumeData]);

  const handleAddProject = () => {
    setProjectList((list) => [
      ...list,
      {
        tempId: Date.now().toString(),
        title: "",
        description: "",
        link: "",
        techstack: "", // Keep as string for input, convert on save
      },
    ]);
  };

  const handleRemoveProject = (id) => {
    setProjectList((list) =>
      list.filter((project) => project._id !== id && project.tempId !== id)
    );
  };

  const handleInputChange = (id, field, value) => {
    setProjectList((list) =>
      list.map((project) =>
        project._id === id || project.tempId === id
          ? { ...project, [field]: value }
          : project
      )
    );
  };

  const handleSave = async () => {
    try {
      const updatedProjects = projectList.map(({ tempId, ...rest }) => ({
        ...rest,
        techstack:
          typeof rest.techstack === "string" && rest.techstack.length > 0
            ? rest.techstack.split(",").map((item) => item.trim())
            : [], // Ensure techstack is always an array
      }));

      const response = await axios.post(
        `${RESUME_API_END_POINT}/${userId}/projects`,
        { projects: updatedProjects },
        { withCredentials: true }
      );

      dispatch(setResumeData(response.data.resume));
      alert("Projects updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save projects.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 pt-20">
      <ResumeNavbar />
      <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl shadow-2xl  rounded-lg bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 backdrop-blur-sm border 0 p-6 mb-8">
          <CardHeader className="text-center py-4">
            <h2 className="text-3xl font-semibold text-gray-800">Projects</h2>
            <div className="w-[70%] h-1 bg-blue-700 mx-auto mt-2"></div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {projectList.length === 0 ? (
              <div className="w-full bg-blue-50  border border-blue-400 text-blue-800 p-4 rounded text-center shadow-md">
                No projects added yet. Click "Add Project" to get started.
              </div>
            ) : (
              projectList.map((project, index) => {
                const key = project._id || project.tempId;

                return (
                  <Card
                    key={key}
                    className="w-full border bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 backdrop-blur-sm rounded-lg p-6  shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        {`Project ${index + 1}`}
                      </h3>

                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1 shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => handleRemoveProject(key)}
                      >
                        <Trash size={16} />
                        <span>Remove</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`${key}-title`}
                          className="block text-gray-700 font-semibold"
                        >
                          Title
                        </Label>
                        <Input
                          id={`${key}-title`}
                          value={project.title}
                          onChange={(e) =>
                            handleInputChange(key, "title", e.target.value)
                          }
                          className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label
                          htmlFor={`${key}-description`}
                          className="block text-gray-700 font-semibold"
                        >
                          Description
                        </Label>
                        <Textarea
                          id={`${key}-description`}
                          value={project.description}
                          onChange={(e) =>
                            handleInputChange(
                              key,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor={`${key}-link`}
                          className="block text-gray-700 font-semibold"
                        >
                          Link (Hosted)
                        </Label>
                        <Input
                          id={`${key}-link`}
                          value={project.link}
                          onChange={(e) =>
                            handleInputChange(key, "link", e.target.value)
                          }
                          className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor={`${key}-techstack`}
                          className="block text-gray-700 font-semibold"
                        >
                          Tech Stack (comma-separated)
                        </Label>
                        <Input
                          id={`${key}-techstack`}
                          value={
                            Array.isArray(project.techstack)
                              ? project.techstack.join(", ")
                              : project.techstack
                          }
                          onChange={(e) =>
                            handleInputChange(key, "techstack", e.target.value)
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

          <div className="flex gap-4 items-center px-6 pb-6 justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
              onClick={handleSave}
            >
              Save Projects
            </Button>
            <Button
              onClick={handleAddProject}
              variant="outline"
              className="flex items-center space-x-2 border-indigo-600 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
            >
              <PlusCircle size={20} />
              <span>Add Project</span>
            </Button>
          </div>
        </div>

        <div className="mb-6 w-full max-w-4xl flex justify-between mt-8">
          <Link
            to={`/${userId}/resumebuilder/edit/education-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105"
          >
            <ArrowLeft className="mr-2 size-5" />
            Education Section
          </Link>
          <Link
            to={`/${userId}/resumebuilder/edit/experience-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105"
          >
            Experience Section
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeProjects;
