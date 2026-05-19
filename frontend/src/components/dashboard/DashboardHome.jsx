import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Briefcase, CalendarCheck, Bookmark, CheckCircle, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { MOCK_STATS } from '@/utils/mockData';

const StatCard = ({ icon: Icon, label, value, color, link }) => (
    <Link to={link} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-200 group">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
            <div className={`p-2.5 rounded-lg ${color}`}>
                <Icon size={20} />
            </div>
        </div>
        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
            <span>View details</span>
            <ArrowRight size={12} />
        </div>
    </Link>
);

const DashboardHome = () => {
    const { user } = useSelector(store => store.auth);
    const [stats, setStats] = useState(MOCK_STATS);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/dashboard/stats`, { withCredentials: true });
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (error) {
                // Mock data already set as default
            }
        };
        fetchStats();
    }, []);

    const completion = stats.profileCompletion || user?.profile?.profileCompletion || 0;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Welcome back, {user?.fullname?.split(' ')[0]}
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Here's what's happening with your career journey
                    </p>
                </div>
                {completion < 100 && (
                    <Link to="/profile" className="glass-card rounded-xl p-4 flex items-center gap-4 max-w-sm hover:border-primary/30 transition-all">
                        <div className="relative w-12 h-12">
                            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                                <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--primary))"
                                    strokeWidth="3" strokeLinecap="round"
                                    strokeDasharray={`${(completion / 100) * 125.6} 125.6`}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">
                                {completion}%
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Complete your profile</p>
                            <p className="text-xs text-muted-foreground">Stand out to recruiters</p>
                        </div>
                    </Link>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Briefcase} label="Applications" value={stats.totalApplications} color="bg-blue-500/10 text-blue-400" link="/internships?tab=applied" />
                <StatCard icon={CalendarCheck} label="Interviews" value={stats.totalInterviews} color="bg-purple-500/10 text-purple-400" link="/interviews" />
                <StatCard icon={CheckCircle} label="Selected" value={stats.acceptedApplications} color="bg-green-500/10 text-green-400" link="/internships?tab=selected" />
                <StatCard icon={Bookmark} label="Bookmarked" value={stats.bookmarkedCount} color="bg-amber-500/10 text-amber-400" link="/internships?tab=bookmarked" />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Application Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-yellow-400" />
                                <span className="text-sm text-muted-foreground">Pending</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">{stats.pendingApplications}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-400" />
                                <span className="text-sm text-muted-foreground">Accepted</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">{stats.acceptedApplications}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-red-400" />
                                <span className="text-sm text-muted-foreground">Rejected</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">{stats.rejectedApplications}</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                    <div className="space-y-2">
                        <Link to="/internships" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Briefcase size={18} className="text-primary" />
                                <span className="text-sm text-foreground">Browse Internships</span>
                            </div>
                            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                        <Link to="/companies" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                                <span className="text-sm text-foreground">Explore Companies</span>
                            </div>
                            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                        <Link to="/profile" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <span className="text-sm text-foreground">Update Profile</span>
                            </div>
                            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
