import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Bell, Search, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const breadcrumbMap = {
    '/dashboard': 'Home',
    '/companies': 'Companies',
    '/internships': 'Internships',
    '/interviews': 'Interview Invites',
    '/hackathons': 'Hackathons',
    '/events': 'Events',
    '/reports': 'Reports',
    '/feedbacks': 'Feedbacks',
    '/profile': 'Your Profile',
    '/help': 'Help Desk',
    '/jobs': 'Jobs',
};

const Header = () => {
    const location = useLocation();
    const { user } = useSelector(store => store.auth);
    const [searchQuery, setSearchQuery] = useState('');

    const unreadNotifications = user?.notifications?.filter(n => !n.read)?.length || 0;

    const currentPath = '/' + location.pathname.split('/')[1];
    const pageTitle = breadcrumbMap[currentPath] || 'Dashboard';

    return (
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center justify-between h-16 px-4 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm ml-12 lg:ml-0">
                    <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{pageTitle}</span>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border w-64">
                        <Search size={16} className="text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                        />
                    </div>

                    {/* Notifications */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="relative p-2 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-colors">
                                <Bell size={20} />
                                {unreadNotifications > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                                    </span>
                                )}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 bg-card border-border" align="end">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-foreground">Notifications</h4>
                                <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
                                    {user?.notifications?.length > 0 ? (
                                        user.notifications.slice(0, 5).map((n, i) => (
                                            <div key={i} className={`p-2 rounded-lg text-xs ${n.read ? 'text-muted-foreground' : 'text-foreground bg-primary/5'}`}>
                                                {n.message}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-muted-foreground py-4 text-center">No notifications</p>
                                    )}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Profile Avatar */}
                    <Link to="/profile" className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage
                                src={user?.profile?.profilePhoto || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.fullname || 'U')}
                                alt={user?.fullname}
                            />
                        </Avatar>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
