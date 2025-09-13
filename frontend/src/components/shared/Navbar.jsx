import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { setResumeData } from "@/redux/resumeSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler for user logout
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true, // Important for sending cookies
      });
      if (res.data.success) {
        dispatch(setUser(null)); // Clear user data in Redux
        dispatch(setResumeData(null)); // Clear resume data
        navigate("/"); // Redirect to home page
        toast.success(res.data.message); // Show success toast
      }
    } catch (error) {
      console.error("Logout error:", error); // Log error for debugging
      toast.error(error.response?.data?.message || "Logout failed."); // Show error toast
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {" "}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {" "}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {" "}
            Career <span className="text-[#f88400]">Spring</span>{" "}
          </h1>
        </div>
        <div className="flex items-center gap-6 md:gap-10">
          {" "}
          <ul className="hidden md:flex font-medium items-center gap-6 text-gray-700">
            {" "}
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to={"/admin/companies"}
                    className="hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/jobs"}
                    className="hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/jobs"}
                    className="hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/browse"}
                    className="hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${user?._id}/resumebuilder/home`}
                    className="hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    Resume Builder
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              {" "}
              <Link to={"/login"}>
                <Button
                  variant={"outline"}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 px-4 py-2 rounded-md"
                >
                  Login
                </Button>{" "}
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#f88d00] hover:bg-[#f87c00] text-white px-4 py-2 rounded-md transition-colors duration-200">
                  {" "}
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9 border-2 border-transparent hover:border-[#6A38C2] transition-all duration-200">
                  {" "}
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://placehold.co/40x40/E0E0E0/808080?text=User"
                    }
                    alt={user?.fullname || "User Avatar"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 mr-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-100">
                {" "}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                  {" "}
                  <Avatar className="h-14 w-14 flex-shrink-0">
                    {" "}
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://placehold.co/60x60/E0E0E0/808080?text=User"
                      } // Fallback for popover avatar
                      alt={user?.fullname || "User Avatar"}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {user?.fullname}
                    </h4>{" "}
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {user?.profile?.bio || "No bio available."}
                    </p>{" "}
                  </div>
                </div>
                <div className="flex flex-col text-gray-700">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200">
                      {" "}
                      <User2 className="h-5 w-5 text-gray-500" />{" "}
                      <Button
                        variant="link"
                        className="text-gray-700 hover:no-underline px-0 py-2 h-auto text-base"
                      >
                        {" "}
                        <Link to={"/profile"}>View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200">
                    {" "}
                    <LogOut className="h-5 w-5 text-gray-500" />{" "}
                    <Button
                      variant="link"
                      onClick={logoutHandler}
                      className="text-gray-700 hover:no-underline px-0 py-2 h-auto text-base"
                    >
                      {" "}
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
