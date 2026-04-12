import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { setAllJobs, setAllAppliedJobs } from '@/redux/jobSlice';
import { Loader2 } from 'lucide-react';
import { TEST_CREDENTIALS, MOCK_USER, MOCK_RECRUITER, MOCK_JOBS, MOCK_APPLIED_JOBS } from '@/utils/mockData';

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password || !input.role) {
            toast.error("Please fill all fields");
            return;
        }

        dispatch(setLoading(true));

        // Simulate network delay
        await new Promise(r => setTimeout(r, 600));

        const { email, password, role } = input;

        // Check hardcoded student creds
        if (
            email === TEST_CREDENTIALS.student.email &&
            password === TEST_CREDENTIALS.student.password &&
            role === TEST_CREDENTIALS.student.role
        ) {
            dispatch(setUser(MOCK_USER));
            dispatch(setAllJobs(MOCK_JOBS));
            dispatch(setAllAppliedJobs(MOCK_APPLIED_JOBS));
            dispatch(setLoading(false));
            toast.success(`Welcome back, ${MOCK_USER.fullname}`);
            navigate("/dashboard");
            return;
        }

        // Check hardcoded recruiter creds
        if (
            email === TEST_CREDENTIALS.recruiter.email &&
            password === TEST_CREDENTIALS.recruiter.password &&
            role === TEST_CREDENTIALS.recruiter.role
        ) {
            dispatch(setUser(MOCK_RECRUITER));
            dispatch(setLoading(false));
            toast.success(`Welcome back, ${MOCK_RECRUITER.fullname}`);
            navigate("/admin/companies");
            return;
        }

        dispatch(setLoading(false));
        toast.error("Invalid credentials. Use the test accounts shown below.");
    };

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl gradient-border flex items-center justify-center">
                            <span className="text-white font-bold text-xs">JOH</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground tracking-tight">Job-O-Hire</span>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-2">India-Japan Talent Bridge</p>
                </div>

                <div className="glass-card rounded-2xl p-6">
                    <h1 className="font-bold text-xl text-foreground mb-6">Login</h1>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <Label className="text-foreground text-sm">Email</Label>
                            <Input type="email" value={input.email} name="email" onChange={changeEventHandler}
                                placeholder="student@jobohire.com" className="mt-1 bg-white/5 border-border text-foreground" />
                        </div>
                        <div>
                            <Label className="text-foreground text-sm">Password</Label>
                            <Input type="password" value={input.password} name="password" onChange={changeEventHandler}
                                placeholder="test1234" className="mt-1 bg-white/5 border-border text-foreground" />
                        </div>
                        <div>
                            <Label className="text-foreground text-sm mb-2 block">Role</Label>
                            <RadioGroup className="flex items-center gap-6">
                                {['student', 'recruiter'].map(role => (
                                    <div key={role} className="flex items-center space-x-2">
                                        <Input type="radio" name="role" value={role}
                                            checked={input.role === role} onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4 accent-primary" />
                                        <Label className="text-foreground capitalize cursor-pointer">{role}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {loading ? (
                            <Button className="w-full bg-primary" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">Login</Button>
                        )}

                        <p className="text-sm text-center text-muted-foreground">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:underline">Signup</Link>
                        </p>
                    </form>
                </div>

                {/* Test credentials hint */}
                <div className="mt-4 glass-card rounded-xl p-4">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Test Credentials</p>
                    <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                            <div>
                                <span className="text-primary font-medium">Student:</span>
                                <span className="text-muted-foreground ml-2">student@jobohire.com / test1234</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                            <div>
                                <span className="text-primary font-medium">Recruiter:</span>
                                <span className="text-muted-foreground ml-2">recruiter@jobohire.com / test1234</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
