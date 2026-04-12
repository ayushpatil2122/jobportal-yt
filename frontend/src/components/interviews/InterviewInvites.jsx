import React, { useEffect, useState } from 'react';
import { CalendarCheck, Clock, Video, Mail, User, Building2, Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage } from '../ui/avatar';
import { motion } from 'framer-motion';
import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '@/utils/constant';
import { MOCK_INTERVIEWS } from '@/utils/mockData';

const InterviewCard = ({ interview, isPast }) => {
    const date = new Date(interview.scheduledDate);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const statusColors = {
        scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        completed: 'bg-green-500/10 text-green-400 border-green-500/20',
        cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
        rescheduled: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };

    return (
        <div className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                        {interview.company?.logo ? (
                            <Avatar className="w-10 h-10 rounded-lg"><AvatarImage src={interview.company.logo} /></Avatar>
                        ) : (
                            <Building2 size={18} className="text-primary" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">{interview.position}</h3>
                        <p className="text-xs text-muted-foreground">{interview.company?.name}</p>
                    </div>
                </div>
                <Badge className={`text-[10px] border ${statusColors[interview.status] || statusColors.scheduled}`}>
                    {interview.status?.charAt(0).toUpperCase() + interview.status?.slice(1)}
                </Badge>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{dateStr}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{timeStr} ({interview.duration || 30} minutes)</span>
                </div>
                {interview.field && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={14} />
                        <span>{interview.field}</span>
                    </div>
                )}
            </div>

            {interview.interviewerEmails?.length > 0 && (
                <div className="mb-4">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Interviewers</p>
                    <div className="flex flex-wrap gap-1.5">
                        {interview.interviewerEmails.map((email, i) => (
                            <a key={i} href={`mailto:${email}`}
                                className="flex items-center gap-1 text-xs text-primary hover:underline bg-primary/5 px-2 py-1 rounded">
                                <Mail size={10} />{email}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {interview.notes && (
                <p className="text-xs text-muted-foreground bg-white/5 rounded-lg p-3 mb-4">{interview.notes}</p>
            )}

            {!isPast && interview.status === 'scheduled' && (
                <div className="flex items-center gap-2">
                    {interview.meetingLink && (
                        <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                            <Video size={14} />Join
                        </a>
                    )}
                    <button className="px-4 py-2 bg-white/5 text-muted-foreground rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                        Request Reschedule
                    </button>
                </div>
            )}
        </div>
    );
};

const InterviewInvites = () => {
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [activeSection, setActiveSection] = useState('upcoming');

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await axios.get(`${INTERVIEW_API_END_POINT}/my`, { withCredentials: true });
                if (res.data.success) {
                    setUpcoming(res.data.upcoming || []);
                    setPast(res.data.past || []);
                }
            } catch (error) {
                setUpcoming(MOCK_INTERVIEWS.upcoming);
                setPast(MOCK_INTERVIEWS.past);
            }
        };
        fetchInterviews();
    }, []);

    const currentList = activeSection === 'upcoming' ? upcoming : past;

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Interview Invites</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your interview schedule</p>
            </div>

            {/* Section Tabs */}
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setActiveSection('upcoming')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'upcoming' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                >
                    Upcoming ({upcoming.length})
                </button>
                <button
                    onClick={() => setActiveSection('past')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === 'past' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                >
                    Past Interviews ({past.length})
                </button>
            </div>

            {/* Interview List */}
            {currentList.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <CalendarCheck size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                        No {activeSection} interviews
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {activeSection === 'upcoming'
                            ? 'Apply to internships and wait for interview invites'
                            : 'Your completed interviews will appear here'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {currentList.map((interview) => (
                        <motion.div key={interview._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                            <InterviewCard interview={interview} isPast={activeSection === 'past'} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InterviewInvites;
