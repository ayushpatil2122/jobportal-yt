import React, { useEffect, useState } from 'react';
import { Briefcase, CalendarCheck, CheckCircle, Clock, XCircle, Bookmark, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { MOCK_STATS } from '@/utils/mockData';

const MetricCard = ({ icon: Icon, label, value, color }) => (
    <div className="glass-card rounded-xl p-5">
        <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-lg ${color}`}>
                <Icon size={20} />
            </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
);

const ProgressBar = ({ label, value, max, color }) => {
    const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium text-foreground">{value} ({percentage}%)</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
};

const ReportsPage = () => {
    const [stats, setStats] = useState(MOCK_STATS);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/dashboard/stats`, { withCredentials: true });
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (error) {
                // Mock data already set
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
                <p className="text-sm text-muted-foreground mt-1">Track your career progress and application metrics</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard icon={Briefcase} label="Total Applications" value={stats.totalApplications} color="bg-blue-500/10 text-blue-400" />
                <MetricCard icon={CalendarCheck} label="Interviews" value={stats.totalInterviews} color="bg-purple-500/10 text-purple-400" />
                <MetricCard icon={CheckCircle} label="Selected" value={stats.acceptedApplications} color="bg-green-500/10 text-green-400" />
                <MetricCard icon={TrendingUp} label="Success Rate" value={`${stats.interviewSuccessRate}%`} color="bg-amber-500/10 text-amber-400" />
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-5">Application Breakdown</h3>
                    <div className="space-y-4">
                        <ProgressBar label="Pending" value={stats.pendingApplications} max={stats.totalApplications} color="bg-yellow-400" />
                        <ProgressBar label="Accepted" value={stats.acceptedApplications} max={stats.totalApplications} color="bg-green-400" />
                        <ProgressBar label="Rejected" value={stats.rejectedApplications} max={stats.totalApplications} color="bg-red-400" />
                    </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-5">Profile Score</h3>
                    <div className="flex items-center justify-center py-4">
                        <div className="relative w-32 h-32">
                            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                                <circle cx="64" cy="64" r="56" fill="none"
                                    stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                                    strokeDasharray={`${(stats.profileCompletion / 100) * 351.86} 351.86`}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                                {stats.profileCompletion}%
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                        {stats.profileCompletion >= 100
                            ? 'Your profile is complete!'
                            : 'Complete your profile to increase visibility'}
                    </p>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/10">
                        <Bookmark size={24} className="text-amber-400" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground">{stats.bookmarkedCount}</p>
                        <p className="text-sm text-muted-foreground">Bookmarked</p>
                    </div>
                </div>
                <div className="glass-card rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                        <Clock size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground">{stats.pendingApplications}</p>
                        <p className="text-sm text-muted-foreground">Awaiting Response</p>
                    </div>
                </div>
                <div className="glass-card rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-red-500/10">
                        <XCircle size={24} className="text-red-400" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground">{stats.rejectedApplications}</p>
                        <p className="text-sm text-muted-foreground">Not Selected</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
