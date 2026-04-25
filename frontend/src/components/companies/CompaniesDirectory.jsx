import React, { useEffect, useState } from 'react';
import { Search, LayoutGrid, List, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage } from '../ui/avatar';
import { motion } from 'framer-motion';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { MOCK_COMPANIES } from '@/utils/mockData';

const companyTypeFilters = ['All', 'Corporate', 'Start-up', 'MNC'];
const industryFilters = ['All', 'Data Science', 'IT', 'Analytics', 'Engineering', 'Manufacturing', 'Finance'];

const CompanyCard = ({ company, viewMode }) => {
    if (viewMode === 'list') {
        return (
            <div className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {company.logo ? (
                        <Avatar className="w-12 h-12 rounded-lg"><AvatarImage src={company.logo} /></Avatar>
                    ) : (
                        <span className="text-lg font-bold text-primary">{company.name?.charAt(0)}</span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{company.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><MapPin size={12} />{company.location || company.country || 'Japan'}</span>
                        {company.companyType && <Badge variant="secondary" className="text-[10px] border-0 bg-white/5">{company.companyType}</Badge>}
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {company.industry?.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">{tag}</Badge>
                    ))}
                </div>
                {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                        className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink size={16} />
                    </a>
                )}
            </div>
        );
    }

    return (
        <div className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                        <Avatar className="w-14 h-14 rounded-xl"><AvatarImage src={company.logo} /></Avatar>
                    ) : (
                        <span className="text-xl font-bold text-primary">{company.name?.charAt(0)}</span>
                    )}
                </div>
                {company.companyType && (
                    <Badge variant="secondary" className="text-[10px] bg-white/5 text-muted-foreground border-0">{company.companyType}</Badge>
                )}
            </div>

            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{company.name}</h3>

            {company.description && (
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{company.description}</p>
            )}

            {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline mb-3" onClick={e => e.stopPropagation()}>
                    <Globe size={12} /><span className="truncate">{company.website.replace(/^https?:\/\//, '')}</span>
                </a>
            )}

            <div className="flex flex-wrap gap-1.5 mb-3">
                {company.industry?.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">{tag}</Badge>
                ))}
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} />
                <span>{company.location || company.country || 'Japan'}</span>
            </div>
        </div>
    );
};

const CompaniesDirectory = () => {
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [typeFilter, setTypeFilter] = useState('All');
    const [industryFilter, setIndustryFilter] = useState('All');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success && res.data.companies?.length > 0) {
                    setCompanies(res.data.companies);
                } else {
                    setCompanies(MOCK_COMPANIES);
                }
            } catch (error) {
                setCompanies(MOCK_COMPANIES);
            }
        };
        fetchCompanies();
    }, []);

    const filtered = companies.filter(c => {
        const matchesSearch = !searchQuery ||
            c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'All' || c.companyType === typeFilter;
        const matchesIndustry = industryFilter === 'All' || c.industry?.includes(industryFilter);
        return matchesSearch && matchesType && matchesIndustry;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Companies</h1>
                    <p className="text-sm text-muted-foreground mt-1">Explore top companies hiring globally</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border w-64">
                        <Search size={16} className="text-muted-foreground" />
                        <input type="text" placeholder="Search companies..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
                    </div>
                    <div className="flex items-center bg-card rounded-lg border border-border p-0.5">
                        <button onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                            <LayoutGrid size={16} />
                        </button>
                        <button onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6">
                <div>
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Company Type</p>
                    <div className="flex flex-wrap gap-1.5">
                        {companyTypeFilters.map(t => (
                            <button key={t} onClick={() => setTypeFilter(t)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${typeFilter === t ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Industry</p>
                    <div className="flex flex-wrap gap-1.5">
                        {industryFilters.map(t => (
                            <button key={t} onClick={() => setIndustryFilter(t)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${industryFilter === t ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Search size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">No companies found</h3>
                    <p className="text-sm text-muted-foreground">Try different filters or search terms</p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
                    {filtered.map((company) => (
                        <motion.div key={company._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                            <CompanyCard company={company} viewMode={viewMode} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompaniesDirectory;
