const VITE_REACT_APP_BACKEND_BASEURL = import.meta.env
  .VITE_REACT_APP_BACKEND_BASEURL;

if (!VITE_REACT_APP_BACKEND_BASEURL) {
  console.error(
    "VITE_REACT_APP_BACKEND_BASEURL is not defined. Make sure it's in your .env file and starts with VITE_"
  );
}

export const USER_API_END_POINT = `${VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user`;
export const JOB_API_END_POINT = `${VITE_REACT_APP_BACKEND_BASEURL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${VITE_REACT_APP_BACKEND_BASEURL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${VITE_REACT_APP_BACKEND_BASEURL}/api/v1/company`;
export const RESUME_API_END_POINT = `${VITE_REACT_APP_BACKEND_BASEURL}/api/v1/resumebuilder`;

export const JOBSUGGESTION_API_END_POINT = `${VITE_REACT_APP_BACKEND_BASEURL}/api/v1/suggestions`;
