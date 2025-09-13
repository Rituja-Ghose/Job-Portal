import { setResumeData } from "@/redux/resumeSlice";
import { RESUME_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetResumeData(userId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${RESUME_API_END_POINT}/${userId}`);

        dispatch(setResumeData(response.data));
      } catch (error) {
        console.log("Error fetching resume data: ", error.message);
      }
    };

    fetchResumeData();
  }, [userId]);
}

export default useGetResumeData;
