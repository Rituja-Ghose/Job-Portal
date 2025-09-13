import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash, ArrowRight, ArrowLeft, PlusIcon } from "lucide-react";
import ResumeNavbar from "./shared/ResumeNavbar";
import axios from "axios";
import { RESUME_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setResumeData } from "@/redux/resumeSlice";

const categories = [
  { key: "languages", label: "Languages" },
  { key: "web", label: "Web Development Skills" },
  { key: "webFrameworks", label: "Web Frameworks/Libraries" },
  { key: "databases", label: "Databases" },
  { key: "other", label: "Other Skills" },
];

const ResumeExtraDetails = () => {
  const { userId } = useParams();
  const { resumeData } = useSelector((store) => store.resume);
  const dispatch = useDispatch();

  const [extraDetails, setExtraDetails] = useState(
    resumeData?.skills
      ? JSON.parse(JSON.stringify(resumeData.skills))
      : {
          languages: [],
          web: [],
          webFrameworks: [],
          databases: [],
          other: [],
        }
  );

  useEffect(() => {
    setExtraDetails(
      resumeData?.skills
        ? JSON.parse(JSON.stringify(resumeData.skills))
        : {
            languages: [],
            web: [],
            webFrameworks: [],
            databases: [],
            other: [],
          }
    );
  }, [resumeData]);

  const handleInputChange = (index, category, value) => {
    const updatedDetails = { ...extraDetails };
    updatedDetails[category] = [...updatedDetails[category]];
    updatedDetails[category][index] = value;
    setExtraDetails(updatedDetails);
  };

  const handleAddItem = (category) => {
    const updatedDetails = { ...extraDetails };
    updatedDetails[category] = [...updatedDetails[category]];
    updatedDetails[category].push("");
    setExtraDetails(updatedDetails);
  };

  const handleDeleteItem = (index, category) => {
    const updatedDetails = { ...extraDetails };
    updatedDetails[category] = [...updatedDetails[category]];
    updatedDetails[category].splice(index, 1);
    setExtraDetails(updatedDetails);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${RESUME_API_END_POINT}/${userId}/skills`,
        { skills: extraDetails },
        { withCredentials: true }
      );

      dispatch(setResumeData(response.data.resume));

      alert("Skills updated successfully!");
    } catch (error) {
      console.error("Failed to save skills:", error);
      alert("Failed to save skills.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 pt-20">
      <ResumeNavbar />
      <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl shadow-2xl  rounded-lg bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 backdrop-blur-sm border p-6 mb-8">
          <CardHeader className="text-center py-4">
            <h2 className="text-3xl font-semibold text-gray-800">
              Extra Details (Skills)
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mt-2"></div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {categories.map((category) => (
              <div key={category.key}>
                <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                  {category.label}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extraDetails[category.key]?.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 space-y-2 items-center"
                    >
                      <Input
                        value={item}
                        placeholder={`Add ${category.label} ${index + 1}`}
                        onChange={(e) =>
                          handleInputChange(index, category.key, e.target.value)
                        }
                        className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-shrink-0 shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => handleDeleteItem(index, category.key)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 flex items-center gap-1 border-indigo-600 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => handleAddItem(category.key)}
                >
                  <PlusIcon size={16} />
                  <span>
                    Add{" "}
                    {category.label
                      .replace(" Skills", "")
                      .replace(" Development", "")}
                  </span>
                </Button>
              </div>
            ))}

            <div className="flex gap-4 pt-6 justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg"
                onClick={handleSave}
              >
                Save Skills
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 w-full max-w-4xl flex justify-between mt-8">
          <Link
            to={`/${userId}/resumebuilder/edit/experience-info`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition duration-100"
          >
            <ArrowLeft className="mr-2 size-5" />
            Experience Section
          </Link>
          <Link
            to={`/${userId}/resumebuilder/templates`}
            className="flex items-center font-semibold text-blue-600 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition duration-100"
          >
            Go to Templates
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeExtraDetails;
