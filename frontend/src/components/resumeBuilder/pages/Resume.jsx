import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumeTemplate1 from "../resumeTemplates/ResumeTemplate1";
import ResumeTemplate2 from "../resumeTemplates/ResumeTemplate2";

export default function Resume() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const { templateNumber } = useParams();

  useEffect(() => {
    if (templateNumber) {
      const number = parseInt(templateNumber);
      setSelectedTemplate(number);
    }
  }, [templateNumber]);

  return (
    <>{selectedTemplate === 1 ? <ResumeTemplate1 /> : <ResumeTemplate2 />}</>
  );
}
