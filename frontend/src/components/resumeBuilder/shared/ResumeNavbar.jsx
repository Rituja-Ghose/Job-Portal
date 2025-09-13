import { setUser } from "@/redux/authSlice";
import { setResumeData } from "@/redux/resumeSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
// Assuming this import path is correct for your logo
import resumebuilderlogo from "../../../assets/resumebuilder.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { userId } = useParams();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const navigation = [
    { name: "Home", href: `/${userId}/resumebuilder/home` },
    {
      name: "Edit Resume",
      href: `/${userId}/resumebuilder/edit/personal-info`, // Base link for Edit Resume
    },
    {
      name: "Templates",
      href: `/${userId}/resumebuilder/templates`,
    },
    { name: "Job Portal", href: "/" }, // Assuming this is an external or root link
  ];

  const logOutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        dispatch(setResumeData(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const isCurrentTab = (item) => {
    let flag = false;
    if (item.name === "Edit Resume") {
      flag = location.pathname.includes("/edit");
    } else {
      flag = location.pathname === item.href;
    }
    return flag;
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-300 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-2xl"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {" "}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}

            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-hidden focus:ring-inset">
              {" "}
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center ml-4 mr-8">
              {/* Link the logo */}

              <Link to={user ? `/${user._id}/resumebuilder/home` : "/"}>
                <img
                  alt="Resume Builder Logo"
                  src={resumebuilderlogo}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            {/* Desktop navigation links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isCurrent = isCurrentTab(item);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={classNames(
                        isCurrent
                          ? "bg-blue-800 text-white"
                          : "text-gray-700 hover:bg-blue-100 hover:text-blue-800",
                        "rounded-md px-3 py-2 text-md font-medium transition-colors duration-200"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown - conditionally render if user is logged in */}
            {user && (
              <Menu as="div" className="relative ml-3">
                <div>
                  {/* Adjusted MenuButton background and focus ring colors */}
                  <MenuButton className="relative flex rounded-full bg-blue-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>

                    <img
                      alt={user?.profile?.firstname || "User Profile"}
                      src={
                        user?.profile?.profilePhoto ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      className="size-11 rounded-full"
                    />
                  </MenuButton>
                </div>
                {/* Use React Router Link within MenuItems if navigating */}
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  {/* Example MenuItem using Link */}
                  <MenuItem>
                    {({ focus }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          focus ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <User2 size={16} /> {/* Adjust icon size */}
                          <span>Your Profile</span>
                        </div>
                      </Link>
                    )}
                  </MenuItem>
                  {/* Logout MenuItem triggering the handler */}
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={logOutHandler}
                        className={classNames(
                          focus ? "bg-gray-100" : "",
                          "block w-full text-left px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <LogOut size={16} /> {/* Adjust icon size */}
                          <span>Log out</span>
                        </div>
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
            {/* Show login/signup link if user is not logged in */}
            {!user && (
              <div className="ml-3">
                <Link to="/auth">
                  {" "}
                  {/* Assuming /auth is your login/signup route */}
                  <Button variant="contained" color="primary" size="small">
                    Login / Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile navigation links */}
      <DisclosurePanel className="sm:hidden">
        {/* Added slightly less transparent background for mobile menu */}
        {/* Using a solid color for better readability in mobile menu */}
        <div className="space-y-1 px-2 pt-2 pb-3 bg-gray-800">
          {" "}
          {navigation.map((item) => {
            // Determine if the current path matches the item's href
            const isCurrent = isCurrentTab(item); // Use the helper function

            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={classNames(
                  isCurrent
                    ? "bg-gray-700 text-yellow-400"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200" // Added transition
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
