import React, { useState } from "react";
import resume1 from "../../../assets/resume_template1.jpg";
import resume2 from "../../../assets/resume_template2.jpg";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ResumeNavbar from "../shared/ResumeNavbar";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button"; // Assuming you want to use the shadcn/ui Button

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user._id);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleClose = () => {
    setSelectedTemplate(null);
  };

  const handleResumeClick = (templateNumber) => {
    if (userId) {
      navigate(`/${userId}/resumebuilder/templates/${templateNumber}`);
    } else {
      console.error("User ID not found");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200 pt-20">
      <ResumeNavbar />

      <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl rounded-lg  backdrop-blur-sm p-6 mb-8">
          <div className="text-center py-4">
            <h2 className="text-3xl font-semibold text-gray-800">
              Resume Templates
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mt-2"></div>{" "}
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {/* Template 1 Card */}
            <div
              onClick={() => handleTemplateClick(resume1)}
              className="cursor-pointer transition duration-300 ease-out shadow-lg hover:scale-105 rounded-lg overflow-hidden backdrop-blur-sm p-4 flex flex-col items-center"
            >
              <img
                className="w-[280px] h-[380px] object-cover border border-blue-300 rounded-md"
                src={resume1}
                alt="Template 1"
              />

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResumeClick(1);
                  }}
                >
                  Use Template 1
                </Button>
              </div>
            </div>

            {/* Template 2 Card */}
            <div
              onClick={() => handleTemplateClick(resume2)}
              className="cursor-pointer transition duration-300 ease-out shadow-lg hover:scale-105 rounded-lg overflow-hidden backdrop-blur-sm p-4 flex flex-col items-center"
            >
              <img
                className="w-[280px] h-[380px] border border-blue-300 object-cover rounded-md"
                src={resume2}
                alt="Template 2"
              />
              {/* Use Template Button */}

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow px-6 py-3 text-lg rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResumeClick(2);
                  }}
                >
                  Use Template 2
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for selected template preview */}
        {selectedTemplate && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={handleClose}
          >
            <div className="relative bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto">
              <IconButton
                onClick={handleClose}
                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              >
                <CloseIcon />
              </IconButton>
              <img
                className="w-full h-auto object-contain mx-auto max-w-[800px] max-h-[90vh]"
                constraints
                src={selectedTemplate}
                alt="Selected Template"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
