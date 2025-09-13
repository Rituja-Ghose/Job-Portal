import React from "react";
import { useParams, Link } from "react-router-dom";
import useGetResumeData from "@/hooks/useGetResumeData";
import ResumeNavbar from "./shared/ResumeNavbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FilePlus2 } from "lucide-react";

function ResumeHome() {
  const { userId } = useParams();

  useGetResumeData(userId);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-200">
      <ResumeNavbar />

      <div className="mt-15 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {" "}
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
            {" "}
            Build Your Professional Resume
          </h1>
          <p className="mt-5 text-xl text-gray-700 max-w-3xl mx-auto">
            {" "}
            Craft a compelling resume that stands out. Create, customize, and
            download your perfect resume in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {" "}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 ease-out">
            {" "}
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-700">
                Start New Resume
              </CardTitle>{" "}
              <CardDescription className="text-gray-600">
                Begin creating a brand new resume from scratch using our guided
                steps.
              </CardDescription>{" "}
            </CardHeader>
            <CardContent className="flex justify-center pt-6">
              <Link to={`/${userId}/resumebuilder/edit/personal-info`}>
                <Button
                  size="lg"
                  className="bg-blue-600 transition duration-100 ease-out hover:bg-blue-700 hover:scale-105 text-white flex items-center gap-2 shadow-md "
                >
                  {" "}
                  <FilePlus2 size={20} />
                  Build Now
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 ease-out ">
            {" "}
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-indigo-700">
                Browse Templates
              </CardTitle>{" "}
              <CardDescription className="text-gray-600">
                Explore our collection of professionally designed resume
                templates to find your perfect match.
              </CardDescription>{" "}
            </CardHeader>
            <CardContent className="flex justify-center pt-6">
              <Link to={`/${userId}/resumebuilder/templates`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-indigo-600 border-indigo-600 transition duration-100 ease-in-out hover:scale-105 flex items-center gap-2 shadow-md"
                >
                  {" "}
                  View Templates
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ResumeHome;
