import { setSuggestedJobs } from "@/redux/authSlice";
import { JOBSUGGESTION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetSuggestedJobs() {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  //   console.log("User in custom hook useGetSuggestedJobs:", user.profile.skills);

  useEffect(() => {
    const fetchSuggestedJobs = async () => {
      try {
        const res = await axios.post(
          `${JOBSUGGESTION_API_END_POINT}`,
          user.profile.skills,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log("In custom hook Suggested Jobs:", res.data);
        if (res.data) {
          dispatch(setSuggestedJobs(res.data));
        }
      } catch (error) {
        console.log("Error fetching suggested jobs:", error);
      }
    };

    fetchSuggestedJobs();
  }, []);
}

export default useGetSuggestedJobs;
