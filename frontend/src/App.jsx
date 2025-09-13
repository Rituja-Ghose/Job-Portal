import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import React from "react";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ResumeHome from "./components/resumeBuilder/ResumeHome";
import ResumeProfile from "./components/resumeBuilder/ResumeProfile";
import ResumeEducation from "./components/resumeBuilder/ResumeEducation";
import ResumeProjects from "./components/resumeBuilder/ResumeProjects";
import ResumeExperience from "./components/resumeBuilder/ResumeExperience";
import ResumeExtraDetails from "./components/resumeBuilder/ResumeExtraDetails";
import Templates from "./components/resumeBuilder/pages/Templates";
import Resume from "./components/resumeBuilder/pages/Resume";
import JobSetup from "./components/admin/JobSetup";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  // admin
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <ProtectedRoute>
        <JobSetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  // resume builder
  { path: "/:userId/resumebuilder/home", element: <ResumeHome /> },
  { path: "/:userId/resumebuilder/edit/personal-info", element: <ResumeProfile /> },
  { path: "/:userId/resumebuilder/edit/education-info", element: <ResumeEducation /> },
  { path: "/:userId/resumebuilder/edit/projects-info", element: <ResumeProjects /> },
  { path: "/:userId/resumebuilder/edit/experience-info", element: <ResumeExperience /> },
  { path: "/:userId/resumebuilder/edit/extra-info", element: <ResumeExtraDetails /> },
  { path: "/:userId/resumebuilder/templates", element: <Templates /> },
  { path: "/:userId/resumebuilder/templates/:templateNumber", element: <Resume /> },
];

// ✅ Add basename here
const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASENAME || "/",
});

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
