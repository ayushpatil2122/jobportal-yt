import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/companies");
        } else if (user) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    }, [user, navigate]);

    return null;
};

export default Home;
