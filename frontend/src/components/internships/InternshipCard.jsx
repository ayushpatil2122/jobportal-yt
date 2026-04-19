import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Clock, Users, Calendar, Bookmark, BookmarkCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage } from '../ui/avatar';
import axios from 'axios';
import { BOOKMARK_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const InternshipCard = ({ job, showBookmark = true }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const isBookmarked = user?.bookmarkedJobs?.includes(job?._id);

    const daysUntilDeadline = (deadline) => {
        if (!deadline) return null;
        const diff = new Date(deadline) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const deadlineDays = daysUntilDeadline(job?.deadline);

    const handleBookmark = async (e) => {
        e.stopPropagation();
        try {
            const res = await axios.put(`${BOOKMARK_API_END_POINT}/toggle/${job._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                const updatedBookmarks = res.data.bookmarked
                    ? [...(user.bookmarkedJobs || []), job._id]
                    : (user.bookmarkedJobs || []).filter(id => id !== job._id);
                dispatch(setUser({ ...user, bookmarkedJobs: updatedBookmarks }));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const compensationText = job?.salary
        ? `${job.salary.toLocaleString()} ${job?.compensation?.currency || 'JPY'}`
        : 'TBA';

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className="glass-card rounded-xl p-5 cursor-pointer hover:border-primary/30 transition-all duration-200 group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                        {job?.company?.logo ? (
                            <Avatar className="w-10 h-10 rounded-lg">
                                <AvatarImage src={job.company.logo} />
                            </Avatar>
                        ) : (
                            <span className="text-sm font-bold text-primary">
                                {job?.company?.name?.charAt(0) || 'C'}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">{job?.company?.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin size={12} />
                            <span>{job?.location || 'Japan'}</span>
                        </div>
                    </div>
                </div>
                {showBookmark && (
                    <button
                        onClick={handleBookmark}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {isBookmarked ? (
                            <BookmarkCheck size={18} className="text-primary" />
                        ) : (
                            <Bookmark size={18} className="text-muted-foreground" />
                        )}
                    </button>
                )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {job?.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{job?.description}</p>

            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
                {job?.position > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users size={12} />
                        <span>{job.position} openings</span>
                        <CheckCircle2 size={12} className="text-green-400 ml-0.5" />
                    </div>
                )}
                {job?.duration?.value && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>{job.duration.value} {job.duration.unit || 'days'}</span>
                    </div>
                )}
                <div className="text-xs font-medium text-primary">{compensationText}</div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
                {job?.eligibility?.slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px] bg-white/5 text-muted-foreground border-0">
                        {tag}
                    </Badge>
                ))}
                {job?.jobType && (
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">
                        {job.jobType}
                    </Badge>
                )}
            </div>

            {/* Deadline */}
            {deadlineDays !== null && (
                <div className="flex items-center gap-1.5 text-xs">
                    <Calendar size={12} className={deadlineDays <= 3 ? 'text-red-400' : 'text-muted-foreground'} />
                    <span className={deadlineDays <= 3 ? 'text-red-400 font-medium' : 'text-muted-foreground'}>
                        {deadlineDays > 0
                            ? `${deadlineDays} day${deadlineDays !== 1 ? 's' : ''} left`
                            : 'Deadline passed'
                        }
                    </span>
                </div>
            )}
        </div>
    );
};

export default InternshipCard;
