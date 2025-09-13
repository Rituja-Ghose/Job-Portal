import React from "react";
import ResumeNavbar from "../shared/ResumeNavbar";

const resumeData = {
  name: "ABHIJIT KHYADE",
  contact: {
    phone: "9356678182",
    email: "abhikhyade07@gmail.com",
    other: [
      "a_khyade", // Placeholder for other contact/profile links
      "a__khyade", // Placeholder
      "khyade", // Placeholder
    ],
  },
  experience: [
    {
      title: "Software Engineer Intern",
      company: "At ABC Tech Solutions",
      years: "Nov-2023-Jan-2024",
      description: [
        "Developed and maintained web applications using HTML, CSS, JavaScript, and React.js.",
        "Assisted in debugging and troubleshooting issues reported by users and QA team.",
        "Collaborated with senior developers to implement new features and enhance existing codebase.",
      ],
    },
    {
      title: "Marketing Assistant",
      company: "At XYZ Marketing Agency",
      years: "Feb-2024-Apr-2024",
      description: [
        "Conducted market research and competitor analysis to identify trends and opportunities.",
        "Assisted in creating marketing campaigns across various channels, including social media and email.",
        "Contributed to the development of marketing materials such as brochures, flyers, and presentations.",
      ],
    },
  ],
  projects: [
    {
      title: "Online Bookstore",
      techStack: "React.js, Redux, Node.js, Express.js, MongoDB, Stripe API", // Placeholder tech stack
      description: [
        "An online platform for buying and selling books.",
        "Users can browse through a wide range of genres, view book details, and make purchases securely.",
        "Includes features such as user authentication, cart management, order tracking, and payment processing.",
      ],
    },
    {
      title: "Task Management App",
      techStack:
        "Angular, TypeScript, Django, PostgreSQL, OAuth 2.0, WebSockets", // Placeholder tech stack
      description: [
        "A web-based task management application for organizing personal or team tasks.",
        "Users can create tasks, assign them to team members, set deadlines, and track progress.",
        "Supports features like task prioritization, categorization, and notification reminders.",
      ],
    },
  ],
  education: [
    {
      institution: "Pune Institute of Computer Technology",
      degree: "B.Tech in IT",
      years: "2021-2025",
      details: "CGPA: 9.48",
    },
    {
      institution: "Sangameshwar College",
      degree: "Maharashtra State Board",
      years: "2020-2021",
      details: "Per: 96.16 %",
    },
    {
      institution: "Mahatama Phule Vidyalaya",
      degree: "Maharashtra State Board",
      years: "2018-2019",
      details: "Per: 96.00 %",
    },
  ],
  skills: {
    languages: "C, C++, Python, Java",
    web: "HTML, CSS, JavaScript",
    webFrameworks: "Django, React.js, Express.js",
    databases: "PostgreSQL, MongoDB",
    other: "Teamwork, Leadership",
  },
  achievementsAndExtraCurricular: [
    "Won first place in a regional coding competition.",
    "Winner of regional hackathon.",
    "Specialist on Codeforces",
    "Volunteered as a mentor for underprivileged high school students.",
    "President of the computer science club, organizing coding workshops",
  ],
};

const ResumeTemplate2 = () => {
  return (
    // Main container for the resume, centered and with padding
    <div className="mb-10">
      <ResumeNavbar />
      <div className="container mt-40  mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl">
        {/* Header Section: Name and Contact Info */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            {resumeData.name}
          </h1>
          <div className="flex justify-center items-center text-gray-600 text-sm space-x-4">
            <span>{resumeData.contact.phone}</span>
            <span>|</span>
            <span>{resumeData.contact.email}</span>
            <span>|</span>
            {/* Map through other contact/profile links */}
            {resumeData.contact.other.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < resumeData.contact.other.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* Experience Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Experience
          </h2>
          {/* Map through experience entries */}
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-gray-800">{exp.title}</h3>
                <span className="text-gray-600 text-sm">{exp.years}</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {exp.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Projects
          </h2>
          {/* Map through project entries */}
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-gray-800 mb-1">{project.title}</h3>
              <p className="text-gray-700 text-sm mb-2">
                {project.techStack}
              </p>{" "}
              {/* Placeholder tech stack */}
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {project.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Education
          </h2>
          {/* Map through education entries */}
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                <span className="text-gray-600 text-sm">{edu.years}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 text-sm">
                <p>{edu.degree}</p>
                <span>{edu.details}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm">
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Languages:</h4>
              <p>{resumeData.skills.languages}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Web:</h4>
              <p>{resumeData.skills.web}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Web Frameworks:</h4>
              <p>{resumeData.skills.webFrameworks}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Databases:</h4>
              <p>{resumeData.skills.databases}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Other:</h4>
              <p>{resumeData.skills.other}</p>
            </div>
          </div>
        </section>

        {/* Achievements and Extra Curricular Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Achievements and ExtraCurricular
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            {resumeData.achievementsAndExtraCurricular.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      {/* Download Button (no functionality) */}
      <div className="text-center mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeTemplate2;
