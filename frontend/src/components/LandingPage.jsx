import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Building2, Globe, Users, CheckCircle, Shield,
    GraduationCap, Target, Zap, Star, ChevronDown, TrendingUp, Award,
    Sparkles, ArrowUpRight, MapPin, ExternalLink, Heart, Linkedin,
    Twitter, Mail, ChevronRight, Play, Menu, X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    })
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const CountUp = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [end, duration, inView]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const SectionLabel = ({ icon: Icon, text, color = 'primary' }) => {
    const colors = {
        primary: 'bg-primary/10 text-primary border-primary/20',
        red: 'bg-red-500/10 text-red-400 border-red-500/20',
        green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };
    return (
        <motion.div variants={fadeUp} custom={0}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase ${colors[color]}`}>
            <Icon size={13} />
            {text}
        </motion.div>
    );
};

const LandingPage = () => {
    const { user } = useSelector(store => store.auth);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const hostCompanies = [
        { name: 'PiPhotonics Inc.', field: 'Photonics & Lasers' },
        { name: 'Artience Co., Ltd.', field: 'Materials Science' },
        { name: 'Ishizaka Inc.', field: 'Environmental Tech' },
        { name: 'Accenture Japan', field: 'IT Consulting' },
        { name: 'Bossard Japan', field: 'Industrial Engineering' },
        { name: 'GERD Japan', field: 'Green Energy R&D' },
    ];

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Problem', href: '#problem' },
        { label: 'Solution', href: '#solution' },
        { label: 'Companies', href: '#companies' },
        { label: 'Why Us', href: '#why-us' },
    ];

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* ━━━ Navbar ━━━ */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl gradient-border flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
                            <span className="text-white font-bold text-[10px]">JOH</span>
                        </div>
                        <span className="text-lg font-bold text-foreground tracking-tight">Job-O-Hire</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-all">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <Link to="/dashboard" className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="hidden sm:block px-4 py-2 text-foreground rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                                    Login
                                </Link>
                                <Link to="/signup" className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40">
                                    Get Started
                                </Link>
                            </>
                        )}
                        <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
                            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenu && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map(link => (
                                    <a key={link.href} href={link.href} onClick={() => setMobileMenu(false)}
                                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-all">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ━━━ Hero ━━━ */}
            <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-16 px-4 sm:px-6 lg:px-8 hero-mesh min-h-[90vh] flex items-center">
                <div className="absolute inset-0 grid-bg" />

                {/* Floating orbs */}
                <div className="absolute top-32 left-[10%] w-3 h-3 rounded-full bg-primary/40 animate-float" />
                <div className="absolute top-60 right-[15%] w-2 h-2 rounded-full bg-purple-400/40 animate-float-delayed" />
                <div className="absolute bottom-40 left-[20%] w-2 h-2 rounded-full bg-pink-400/30 animate-float" />

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-5xl mx-auto">
                        <motion.div variants={fadeUp} custom={0}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold mb-10 tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
                            <span className="text-muted-foreground">INDIA</span>
                            <ArrowRight size={12} className="text-primary" />
                            <span className="text-muted-foreground">JAPAN TALENT BRIDGE</span>
                            <span className="text-base ml-1">🇮🇳 🇯🇵</span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} custom={1}
                            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-8 tracking-tight">
                            <span className="text-foreground">Where Top Talent</span>
                            <br />
                            <span className="text-gradient">Meets Global</span>
                            <br />
                            <span className="text-foreground">Opportunity</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} custom={2}
                            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                            The structured recruitment platform bridging India's finest engineering talent
                            with Japan's leading companies. From <span className="text-foreground font-medium">internships to full-time careers</span>.
                        </motion.p>

                        <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup"
                                className="group flex items-center gap-2.5 px-8 py-4 bg-primary text-white rounded-2xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
                                Start Your Journey
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <a href="#about"
                                className="group flex items-center gap-2.5 px-8 py-4 bg-white/[0.04] border border-white/[0.08] text-foreground rounded-2xl text-sm font-semibold hover:bg-white/[0.08] hover:border-white/[0.12] transition-all">
                                Learn More
                                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Stats Strip */}
                    <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible"
                        className="mt-20 sm:mt-28 max-w-5xl mx-auto">
                        <div className="glow-line mb-8" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
                            {[
                                { value: 789, suffix: 'K+', label: 'IT Professional Gap', sub: 'Japan by 2030' },
                                { value: 200, suffix: '+', label: 'Partner Institutions', sub: 'IITs, NITs, BITS' },
                                { value: 50, suffix: '+', label: 'Global Companies', sub: 'Hiring Now' },
                                { value: 95, suffix: '%', label: 'Conversion Rate', sub: 'Intern to Full-time' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient mb-2">
                                        <CountUp end={stat.value} suffix={stat.suffix} />
                                    </p>
                                    <p className="text-sm font-medium text-foreground">{stat.label}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                                </div>
                            ))}
                        </div>
                        <div className="glow-line mt-8" />
                    </motion.div>
                </div>
            </section>

            {/* ━━━ Company Marquee ━━━ */}
            <section className="py-12 border-y border-border/30 bg-white/[0.01] overflow-hidden">
                <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">Trusted by leading organizations across Japan</p>
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
                    <div className="flex animate-marquee">
                        {[...hostCompanies, ...hostCompanies, ...hostCompanies].map((c, i) => (
                            <div key={i} className="flex items-center gap-3 mx-10 flex-shrink-0">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                                    <span className="text-sm font-bold text-primary">{c.name.charAt(0)}</span>
                                </div>
                                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{c.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ About Us ━━━ */}
            <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left - Text */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
                            <SectionLabel icon={Heart} text="About Us" />
                            <motion.h2 variants={fadeUp} custom={1}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-6 leading-tight">
                                Building the Future of
                                <span className="text-gradient"> Cross-Border Hiring</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-6">
                                Job-O-Hire was born from a simple observation: Japan faces a critical workforce shortage
                                with ~789,000 IT professionals needed by 2030, while India produces the world's largest
                                pool of skilled engineering graduates seeking global opportunities.
                            </motion.p>
                            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed mb-8">
                                We bridge this gap with a structured recruitment platform that connects pre-screened,
                                curated talent from India's premier institutions — IITs, NITs, BITS, and more — directly
                                with verified employers in Japan and beyond. Our focus on early-career hiring, from
                                internships to full-time roles, ensures quality placements that benefit both talent and companies.
                            </motion.p>
                            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                                {['Early-Career Focus', 'India-Japan Bridge', 'Pre-Screened Talent', 'T&P Integrated'].map(tag => (
                                    <span key={tag} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right - Visual */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={scaleIn}>
                            <div className="relative">
                                <div className="absolute inset-0 gradient-border rounded-3xl opacity-20 blur-xl" />
                                <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 sm:p-10 space-y-6">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-14 h-14 rounded-2xl gradient-border flex items-center justify-center">
                                            <Globe size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">Our Mission</h3>
                                            <p className="text-sm text-muted-foreground">Democratizing global careers</p>
                                        </div>
                                    </div>
                                    <div className="glow-line" />
                                    <div className="space-y-5">
                                        {[
                                            { icon: Shield, label: 'Verified Employers', value: 'Every listing authenticated' },
                                            { icon: GraduationCap, label: 'Premier Institutions', value: 'IITs, NITs, BITS, IIITs' },
                                            { icon: TrendingUp, label: 'Career Pipeline', value: 'Internship to full-time' },
                                            { icon: Globe, label: 'Cross-Cultural', value: 'Language flexible hiring' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                                    <item.icon size={18} className="text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                                                    <p className="text-xs text-muted-foreground">{item.value}</p>
                                                </div>
                                                <ChevronRight size={14} className="text-muted-foreground/50" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ━━━ Problem Statement ━━━ */}
            <section id="problem" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-16">
                        <SectionLabel icon={Target} text="The Problem" color="red" />
                        <motion.h2 variants={fadeUp} custom={1}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-5">
                            A Broken Hiring Pipeline
                        </motion.h2>
                        <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed text-lg">
                            Japan's Ministry of Economy projects a <span className="text-red-400 font-semibold">~789,000 IT professional shortage by 2030</span>.
                            Existing platforms fail both sides of the equation.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {/* For Japanese Recruiters */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
                            className="card-shine bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 hover:border-red-500/20 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                                    <span className="text-xl">🇯🇵</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">For Japanese Recruiters</h3>
                                    <p className="text-xs text-red-400">Critical workforce challenges</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    'Aging population causing critical workforce shortage',
                                    '~789,000 IT professionals gap projected by 2030',
                                    'Limited access to verified global talent pools',
                                    'No platform specializing in early talent hiring',
                                    'High cost and time for international recruitment'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/[0.04] border border-red-500/[0.06] group hover:border-red-500/[0.12] transition-all">
                                        <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-red-400 text-[10px] font-bold">{i + 1}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* For Indian Students */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
                            className="card-shine bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                                    <span className="text-xl">🇮🇳</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">For Indian Students</h3>
                                    <p className="text-xs text-amber-400">Opportunity gap challenges</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    'Limited visibility into global career opportunities',
                                    'No structured internship → full-time pipeline',
                                    'Flooded with fake or irrelevant job listings',
                                    'Lack of college T&P cell integration with employers',
                                    'No focus on curated, pre-screened early careers'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/[0.04] border border-amber-500/[0.06] group hover:border-amber-500/[0.12] transition-all">
                                        <div className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-amber-400 text-[10px] font-bold">{i + 1}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ━━━ Solution ━━━ */}
            <section id="solution" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-16">
                        <SectionLabel icon={Zap} text="Our Solution" color="green" />
                        <motion.h2 variants={fadeUp} custom={1}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-5">
                            India-Japan Talent Bridge
                        </motion.h2>
                        <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">
                            A dual-sided platform connecting curated Indian talent with verified global employers
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                        {[
                            { icon: Shield, title: 'Pre-Screened Talent Pool', desc: 'Curated candidates from IITs, NITs, IIITs, BITS, and select premier institutions. Quality over quantity.', gradient: 'from-blue-500/10 to-cyan-500/10', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
                            { icon: TrendingUp, title: 'Internship → Full-Time', desc: 'Structured conversion pathway from internships to permanent roles. Companies hire with measurable confidence.', gradient: 'from-emerald-500/10 to-green-500/10', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
                            { icon: GraduationCap, title: 'College T&P Integration', desc: 'Direct connection with Training & Placement cells of premium institutions for trusted hiring at scale.', gradient: 'from-purple-500/10 to-violet-500/10', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
                            { icon: CheckCircle, title: 'Verified Opportunities', desc: 'Eliminates fake or irrelevant job listings. Every opportunity is authenticated, vetted, and real.', gradient: 'from-emerald-500/10 to-teal-500/10', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
                            { icon: Award, title: 'Skill + Project Evaluation', desc: 'Candidates assessed on skills and real projects, not just resumes. Strong emphasis on motivation & culture fit.', gradient: 'from-amber-500/10 to-yellow-500/10', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
                            { icon: Globe, title: 'Language Flexibility', desc: 'Japanese language optional and company-defined. Designed for seamless cross-cultural collaboration.', gradient: 'from-pink-500/10 to-rose-500/10', iconBg: 'bg-pink-500/10', iconColor: 'text-pink-400' },
                        ].map((feature, i) => (
                            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                variants={fadeUp} custom={i}
                                className="group relative bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1">
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-5`}>
                                        <feature.icon size={22} className={feature.iconColor} />
                                    </div>
                                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ Target Audience ━━━ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-16">
                        <SectionLabel icon={Users} text="Who It's For" color="purple" />
                        <motion.h2 variants={fadeUp} custom={1}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-5">
                            A Dual-Side Platform
                        </motion.h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Talent */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
                            className="relative group">
                            <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 sm:p-10 h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <GraduationCap size={26} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">For Talent</h3>
                                        <p className="text-xs text-primary">Students & Fresh Graduates</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        'IIT, NIT, IIIT, BITS & select premier colleges',
                                        'Engineering & Management students',
                                        'Pre-final & final year candidates',
                                        'Graduates with global career aspirations',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                                            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle size={12} className="text-primary" />
                                            </div>
                                            <span className="text-sm text-muted-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Employers */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                            className="relative group">
                            <div className="absolute -inset-px bg-gradient-to-br from-purple-500/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 sm:p-10 h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                                        <Building2 size={26} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">For Employers</h3>
                                        <p className="text-xs text-purple-400">Companies & HR Teams</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        'Japanese companies expanding global hiring',
                                        'Indian startups to enterprises',
                                        'HR teams seeking efficient early-talent pipelines',
                                        'Companies looking for verified, job-ready candidates',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                                            <div className="w-5 h-5 rounded-full bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle size={12} className="text-purple-400" />
                                            </div>
                                            <span className="text-sm text-muted-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ━━━ Why Different ━━━ */}
            <section id="why-us" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
                            className="lg:col-span-2 lg:sticky lg:top-28">
                            <SectionLabel icon={Star} text="Why Job-O-Hire" />
                            <motion.h2 variants={fadeUp} custom={1}
                                className="text-3xl sm:text-4xl font-bold text-foreground mt-6 mb-5">
                                Not Just Another
                                <span className="text-gradient"> Job Portal</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed">
                                Inspired by platforms like Tech Japan and Talendy, but built to be more scalable, more focused, and more impactful across industries.
                            </motion.p>
                        </motion.div>

                        <div className="lg:col-span-3 space-y-4">
                            {[
                                { title: 'Focused on Early-Career Hiring', desc: 'Designed specifically for pre-final & final-year talent — not generic job seekers. We understand the student lifecycle.', icon: Target },
                                { title: 'Structured Conversion Pipeline', desc: 'Internship → full-time pathways with clear metrics. Companies hire with confidence through proven evaluation.', icon: TrendingUp },
                                { title: 'Deep Institutional Integration', desc: 'Direct partnerships with college T&P cells ensure trusted, verified hiring at scale. No middlemen.', icon: GraduationCap },
                                { title: 'Zero Tolerance for Fake Listings', desc: 'Every opportunity is vetted and authenticated. Students see only real, relevant positions from verified employers.', icon: Shield },
                                { title: 'Skills & Projects Over Resumes', desc: 'Evaluation based on real work, motivation statements, and culture fit — not just keywords on paper.', icon: Award },
                            ].map((item, i) => (
                                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    variants={fadeUp} custom={i}
                                    className="group border-glow rounded-2xl p-6 flex items-start gap-5 bg-card/40 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl gradient-border flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
                                        <item.icon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-[15px]">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━ Host Companies ━━━ */}
            <section id="companies" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-16">
                        <SectionLabel icon={Building2} text="Our Partners" color="amber" />
                        <motion.h2 variants={fadeUp} custom={1}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-5">
                            Future Host Companies
                        </motion.h2>
                        <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">
                            Organizations we're actively engaging with for talent collaboration
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {hostCompanies.map((company, i) => (
                            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                variants={fadeUp} custom={i}
                                className="group border-glow rounded-2xl p-6 bg-card/40 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-white/[0.06] flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-500/20 transition-all">
                                        <span className="text-xl font-bold text-primary">{company.name.charAt(0)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-foreground truncate">{company.name}</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">{company.field}</p>
                                        <div className="flex items-center gap-1 mt-1.5">
                                            <MapPin size={10} className="text-primary/60" />
                                            <span className="text-[10px] text-muted-foreground">Japan</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ How It Works ━━━ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-16">
                        <SectionLabel icon={Play} text="How It Works" />
                        <motion.h2 variants={fadeUp} custom={1}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-5">
                            Your Journey in 4 Steps
                        </motion.h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-px">
                            <div className="w-full h-full bg-gradient-to-r from-primary/40 via-purple-400/40 to-pink-400/40" />
                        </div>

                        {[
                            { step: '01', title: 'Create Profile', desc: 'Build your profile with skills, projects, resume, and intro video.', icon: '👤', color: 'from-blue-500/10 to-cyan-500/10' },
                            { step: '02', title: 'Browse & Apply', desc: 'Discover curated internships filtered by your preferences.', icon: '🔍', color: 'from-purple-500/10 to-violet-500/10' },
                            { step: '03', title: 'Interview', desc: 'Receive invites, prepare with resources, and attend sessions.', icon: '🎯', color: 'from-emerald-500/10 to-green-500/10' },
                            { step: '04', title: 'Get Hired', desc: 'Accept your offer and begin your global career journey.', icon: '🚀', color: 'from-amber-500/10 to-yellow-500/10' },
                        ].map((item, i) => (
                            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                variants={fadeUp} custom={i}
                                className="text-center relative group">
                                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} border border-white/[0.06] flex items-center justify-center mx-auto mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-3xl">{item.icon}</span>
                                </div>
                                <span className="text-[10px] text-primary font-bold uppercase tracking-[0.15em]">Step {item.step}</span>
                                <h3 className="font-bold text-foreground mt-2 mb-2 text-[15px]">{item.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ CTA ━━━ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10" />
                        <div className="absolute inset-0 hero-mesh opacity-50" />
                        <div className="relative bg-card/70 backdrop-blur-xl m-[1px] rounded-3xl p-10 sm:p-16 text-center border border-white/[0.06]">
                            <motion.div variants={fadeUp} custom={0}
                                className="w-16 h-16 rounded-2xl gradient-border flex items-center justify-center mx-auto mb-8">
                                <Sparkles size={28} className="text-white" />
                            </motion.div>
                            <motion.h2 variants={fadeUp} custom={1}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5">
                                Ready to Bridge the Gap?
                            </motion.h2>
                            <motion.p variants={fadeUp} custom={2}
                                className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                                Whether you're a student dreaming of global opportunities or a company seeking exceptional talent — your journey starts here.
                            </motion.p>
                            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/signup"
                                    className="group flex items-center gap-2 px-8 py-4 bg-white text-background rounded-2xl text-sm font-bold hover:bg-white/90 transition-all shadow-2xl hover:-translate-y-0.5">
                                    I'm a Student <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                                <Link to="/signup"
                                    className="group flex items-center gap-2 px-8 py-4 border border-white/20 text-foreground rounded-2xl text-sm font-bold hover:bg-white/10 hover:border-white/30 transition-all">
                                    I'm a Recruiter <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ━━━ Footer ━━━ */}
            <footer className="border-t border-border/40 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        {/* Brand Column */}
                        <div className="md:col-span-1">
                            <Link to="/" className="flex items-center gap-2.5 mb-4">
                                <div className="w-9 h-9 rounded-xl gradient-border flex items-center justify-center">
                                    <span className="text-white font-bold text-[10px]">JOH</span>
                                </div>
                                <span className="text-lg font-bold text-foreground tracking-tight">Job-O-Hire</span>
                            </Link>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                Bridging India's finest talent with Japan's leading companies through structured early-career hiring.
                            </p>
                            <div className="flex items-center gap-3">
                                <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all">
                                    <Linkedin size={16} />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all">
                                    <Twitter size={16} />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all">
                                    <Mail size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Platform Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Platform</h4>
                            <ul className="space-y-3">
                                {['Browse Internships', 'Companies Directory', 'Student Dashboard', 'For Recruiters'].map(item => (
                                    <li key={item}>
                                        <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
                            <ul className="space-y-3">
                                {['About Us', 'Careers', 'Blog', 'Contact'].map(item => (
                                    <li key={item}>
                                        <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
                            <ul className="space-y-3">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR Compliance'].map(item => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="glow-line" />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
                        <p className="text-xs text-muted-foreground">
                            &copy; {new Date().getFullYear()} Job-O-Hire. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Bridging Indian talent with global opportunities
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
