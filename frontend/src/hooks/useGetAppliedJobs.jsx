import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { MOCK_APPLIED_JOBS } from "@/utils/mockData";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const { allAppliedJobs } = useSelector(store => store.job);

    useEffect(() => {
        if (allAppliedJobs && allAppliedJobs.length > 0) return;

        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log("Backend unavailable, using mock applied jobs");
                dispatch(setAllAppliedJobs(MOCK_APPLIED_JOBS));
            }
        };
        fetchAppliedJobs();
    }, []);
};

export default useGetAppliedJobs;
