import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import { MOCK_JOBS } from '@/utils/mockData';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, allJobs } = useSelector(store => store.job);

    useEffect(() => {
        // If jobs are already loaded (from mock login), skip API call
        if (allJobs && allJobs.length > 0) return;

        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Backend unavailable, using mock jobs");
                dispatch(setAllJobs(MOCK_JOBS));
            }
        };
        fetchAllJobs();
    }, []);
};

export default useGetAllJobs;
