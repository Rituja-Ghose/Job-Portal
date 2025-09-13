import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import ResumeNavbar from "../shared/ResumeNavbar";

// Define the initial structure and placeholder data
const initialFormattedResumeData = {
  name: "ABHIJIT KHYADE",
  contact: "9356678182 | abhijitkhyade07@gmail.com | Pune",
  education: [
    {
      institution: "Pune Institute of Computer Technology",
      degree: "T.E. IT Engineering",
      years: "2021-2025 | Pune",
      details: "CGPA: 9.46",
    },
    {
      institution: "Sangameshwar College",
      degree: "Percentage: 96.16 %",
      years: "2020-2021 | Solapur",
      details: null,
    },
    {
      institution: "Mahatama Phule Vidyalaya",
      degree: "Percentage: 96.00 %",
      years: "2010-2019 | Mandrup",
      details: null,
    },
  ],
  skills: {
    languages: "C, C++, Python, Java",
    web: "HTML, CSS, JavaScript",
    webFrameworks: "Django, Reactjs, Express.js",
    databases: "PostgreSQL, MongoDB",
    other: "Teamwork, Leadership",
  },
  codingProfile: [
    "akhyade (Platform Name)",
    "a khyade (Another Platform Name)",
  ],
  coreSubjects: [
    "Data Structures and Algorithms",
    "Object Oriented Programming",
    "Database Management System",
    "Operating System",
  ],
  experience: [
    {
      title: "Software Engineer Intern",
      company: "AL ABC Tech Solutions",
      years: "Nov 2023 - Jan 2024",
      description: [
        "Developed and maintained web applications using HTML, CSS, JavaScript, and Reactjs.",
      ],
    },
    {
      title: "Marketing Assistant",
      company: "At XYZ Marketing Agency",
      years: "Feb 2024 - Apr 2024",
      description: [
        "Conducted market research and competitor analysis to identify trends and opportunities.",
      ],
    },
  ],
  projects: [
    {
      title: "Online Bookstore",
      techStack: "React, Redux, Node.js, Express, MongoDB, Stripe API",
      description: ["An online platform for buying and selling books."],
    },
    {
      title: "Task Management App",
      techStack:
        "Angular, TypeScript, Django, PostgreSQL, OAuth 2.0, WebSockets",
      description: [
        "A web-based task management application for organizing personal or team tasks.",
      ],
    },
  ],
  achievements: ["Won first place in a regional coding competition."],
  extraCurricular: [
    "Volunteered as a mentor for underprivileged high school students.",
    "President of the computer science club, organizing coding workshops.",
  ],
};

// Helper function to format date string to "Month Year"
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short" };
  return date.toLocaleDateString("en-US", options);
};

const ResumeTemplate1 = () => {
  const { resumeData } = useSelector((store) => store.resume);

  // Use useMemo to dynamically format the resume data based on Redux state
  const displayedResumeData = useMemo(() => {
    const data = { ...initialFormattedResumeData }; // Start with initial data

    // Update profile section
    if (resumeData?.profile) {
      const profile = resumeData.profile;
      if (profile.firstname || profile.lastname) {
        data.name = `${profile.firstname || ""} ${
          profile.lastname || ""
        }`.trim();
      }
      const contactParts = [];
      if (profile.mobile) contactParts.push(profile.mobile);
      if (profile.email) contactParts.push(profile.email);
      if (profile.address) contactParts.push(profile.address);

      if (contactParts.length > 0) {
        data.contact = contactParts.join(" | ");
      }
    }

    // Update education section
    if (resumeData?.education?.length > 0) {
      data.education = resumeData.education.map((edu) => ({
        institution:
          edu.college || initialFormattedResumeData.education[0]?.institution, // Fallback to initial if missing
        degree: edu.degree || initialFormattedResumeData.education[0]?.degree, // Fallback
        years: `${edu.startYear || ""} - ${edu.endYear || ""}${
          edu.city ? " | " + edu.city : ""
        }`.trim(), // Combine years and city
        details: edu.grades
          ? `CGPA: ${edu.grades}`
          : initialFormattedResumeData.education[0]?.details, // Use grades if available, fallback
      }));
    }

    // Update experience section
    if (resumeData?.experiences?.length > 0) {
      data.experience = resumeData.experiences.map((exp) => ({
        title: exp.role || initialFormattedResumeData.experience[0]?.title, // Fallback
        company:
          exp.institute || initialFormattedResumeData.experience[0]?.company, // Fallback
        years: `${formatDate(exp.start_date)} - ${formatDate(exp.end_date)}`, // Format dates
        description: exp.desc
          ? [exp.desc]
          : initialFormattedResumeData.experience[0]?.description, // Put single desc string in array, fallback
      }));
    }

    // Update projects section
    if (resumeData?.projects?.length > 0) {
      data.projects = resumeData.projects.map((project) => ({
        title: project.title || initialFormattedResumeData.projects[0]?.title, // Fallback
        techStack:
          project.techstack?.join(", ") ||
          initialFormattedResumeData.projects[0]?.techStack, // Join techstack array, fallback
        description: project.description
          ? [project.description]
          : initialFormattedResumeData.projects[0]?.description, // Put single desc string in array, fallback
      }));
    }

    // Update skills section
    if (resumeData?.skills) {
      const skills = resumeData.skills;
      data.skills = {
        languages:
          skills.languages?.join(", ") ||
          initialFormattedResumeData.skills.languages, // Join array, fallback
        web: skills.web?.join(", ") || initialFormattedResumeData.skills.web, // Join array, fallback
        webFrameworks:
          skills.webFrameworks?.join(", ") ||
          initialFormattedResumeData.skills.webFrameworks, // Join array, fallback
        databases:
          skills.databases?.join(", ") ||
          initialFormattedResumeData.skills.databases, // Join array, fallback
        other:
          skills.other?.join(", ") || initialFormattedResumeData.skills.other, // Join array, fallback
      };
    }

    // Update achievements section (assuming achievements might be in resumeData)
    if (resumeData?.achievements?.length > 0) {
      data.achievements = resumeData.achievements; // Use achievements from store if available
    }

    // Update extraCurricular section (assuming extraCurricular might be in resumeData)
    if (resumeData?.extraCurricular?.length > 0) {
      data.extraCurricular = resumeData.extraCurricular; // Use extraCurricular from store if available
    }

    // Note: codingProfile and coreSubjects
    // do not have direct mappings in the provided store data structure.
    // They will retain their initialFormattedResumeData values.

    return data;
  }, [resumeData]);

  // Create a ref to the resume container element
  const contentRef = useRef(null);

  // Define the print styles to maintain the grid layout
  const printStyles = `
    @media print {
      /* Target the specific grid container */
      .print-grid {
        display: grid !important;
        grid-template-columns: 1fr 2fr !important; /* Explicitly set columns for print */
        gap: 2rem !important; /* Ensure gap is maintained */
        
      }

      /* Ensure sections within the grid also behave correctly */
      .print-grid > section {
          display: block !important; /* Ensure sections are block elements */
          float: none !important; /* Prevent floating */
          width: auto !important; /* Prevent fixed widths */
          box-sizing: border-box !important; /* Ensure consistent box model */
          
      }

       /* Optional: Adjust font sizes or margins for print if needed */
       body {
           -webkit-print-color-adjust: exact; /* For better color printing in some browsers */
           print-color-adjust: exact;
           margin: 0 !important; /* Remove default body margin in print */
           padding: 0 !important; /* Remove default body padding in print */
       }

       /* Add styles to prevent elements from breaking across pages */
       h2, h3, ul, p {
           break-inside: avoid !important;
       }

       /* Adjust margins/padding for print if needed */
       .container {
           padding: 0 !important; /* Remove container padding in print */
           margin: 0 auto !important; /* Center the container */
           max-width: 100% !important; /* Allow container to take full width */
       }

       /* Ensure specific elements like list items don't break */
       ul li {
           break-inside: avoid !important;
       }
    }
  `;

  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: printStyles,
  });

  return (
    // Main container for the resume,
    <div className="mb-10">
      <ResumeNavbar />
      {/* Add a ref to the element you want to capture as PDF */}

      <div ref={contentRef} className="  container mx-auto p-4 max-w-4xl mt-40">
        {/* Header Section: Name and Contact Info */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#1F2937" }}>
            {displayedResumeData.name}
          </h1>
          <p className="text-sm" style={{ color: "#4B5563" }}>
            {displayedResumeData.contact}
          </p>
        </header>

        {/* Main Content Area: Two Columns */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print-grid">
          {/* Left Column: Education, Skills, Coding Profile, Core Subjects */}
          <section className="md:col-span-1">
            {/* Education Section */}
            {/* Using inline styles for color and border */}
            <h2 className="text-xl text-blue-600 font-semibold pb-2 mb-4 border-b-2 border-blue-600">
              Education
            </h2>
            {displayedResumeData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold text-black">{edu.institution}</h3>
                <p className="text-sm">{edu.degree}</p>
                <p className="text-sm">{edu.years}</p>
                {edu.details && <p className="text-sm">{edu.details}</p>}
              </div>
            ))}

            {/* Skills Section */}
            {/* Using inline styles for color and border */}
            <h2 className="text-xl font-semibold pb-2 mb-4 mt-6 border-b-2 border-blue-600 text-blue-600">
              Skills
            </h2>
            <div className="mb-2">
              <h4 className="font-bold mb-1">Languages:</h4>
              <p className="text-sm">{displayedResumeData.skills.languages}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-bold mb-1">Web:</h4>
              <p className="text-sm">{displayedResumeData.skills.web}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-bold mb-1">Web Frameworks:</h4>
              <p className="text-sm">
                {displayedResumeData.skills.webFrameworks}
              </p>
            </div>
            <div className="mb-2">
              <h4 className="font-bold mb-1">Databases:</h4>
              <p className="text-sm">{displayedResumeData.skills.databases}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-bold mb-1">Other:</h4>
              <p className="text-sm">{displayedResumeData.skills.other}</p>
            </div>

            {/* Coding Profile Section */}
            {/* Using inline styles for color and border */}
            <h2 className="text-xl font-semibold pb-2 mb-4 mt-6 border-b-2 border-blue-600 text-blue-600">
              Coding Profile
            </h2>
            <div className="mb-2">
              {displayedResumeData.codingProfile.map((profile, index) => (
                <p key={index} className="text-sm mb-1">
                  {profile}
                </p>
              ))}
            </div>

            {/* Core Subjects Section */}
            {/* Using inline styles for color and border */}
            <h2 className="text-xl font-semibold pb-2 mb-4 mt-6 border-b-2 border-blue-600 text-blue-600">
              Core Subjects
            </h2>
            <ul className="list-disc list-inside text-sm">
              {displayedResumeData.coreSubjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </section>

          {/* Right Column: Experience, Projects, Achievements, Extra Curricular */}
          <section className="md:col-span-2">
            {/* Experience Section */}
            {/* mb-8 provides spacing after this section */}
            <section className="mb-8">
              {/* Using inline styles for color and border */}
              <h2 className="text-xl font-semibold pb-2 mb-4 border-b-2 border-blue-600 text-blue-600">
                Experience
              </h2>
              {/* Map through experience entries */}
              {/* mb-4 provides spacing between individual experience entries */}
              {displayedResumeData.experience.map((exp, index) => (
                <div
                  key={index}
                  className={
                    index < displayedResumeData.experience.length - 1
                      ? "mb-4"
                      : ""
                  }
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">{exp.title}</h3>
                    <span className="text-sm">{exp.years}</span>
                  </div>
                  <p className="text-sm mb-2">{exp.company}</p>
                  <ul className="list-disc list-inside text-sm">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Projects Section */}
            {/* mb-8 provides spacing after this section */}
            <section className="mb-8">
              {/* Using inline styles for color and border */}
              <h2 className="text-xl font-semibold pb-2 mb-4 border-b-2 border-blue-600 text-blue-600">
                Projects
              </h2>
              {/* Map through project entries */}
              {/* mb-4 provides spacing between individual project entries */}
              {displayedResumeData.projects.map((project, index) => (
                <div
                  key={index}
                  className={
                    index < displayedResumeData.projects.length - 1
                      ? "mb-4"
                      : ""
                  }
                >
                  <h3 className="font-bold mb-1">{project.title}</h3>
                  <p className="text-sm mb-2">{project.techStack}</p>{" "}
                  {/* Placeholder tech stack */}
                  <ul className="list-disc list-inside text-sm">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Achievements Section */}
            {/* mb-8 provides spacing after this section */}
            <section className="mb-8">
              {/* Using inline styles for color and border */}
              <h2 className="text-xl font-semibold pb-2 mb-4 border-b-2 border-blue-600 text-blue-600">
                Achievements
              </h2>
              <ul className="list-disc list-inside text-sm">
                {displayedResumeData.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>

            {/* Extra Curricular Section */}
            {/* mb-8 provides spacing after this section */}
            <section className="mb-8">
              {/* Using inline styles for color and border */}
              <h2 className="text-xl font-semibold pb-2 mb-4 border-b-2 border-blue-600 text-blue-600">
                Extra Curricular
              </h2>
              <ul className="list-disc list-inside text-sm">
                {displayedResumeData.extraCurricular.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          </section>
        </div>
      </div>
      {/* Download Button */}
      <div className="text-center mt-8">
        {/* Attach the reactToPrintFn function to the button's onClick */}
        {/* Using inline styles for button background and text color */}
        <button
          className="font-bold py-2 px-4 rounded bg-blue-600 text-white"
          onClick={reactToPrintFn}
        >
          Download/Print Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeTemplate1;
