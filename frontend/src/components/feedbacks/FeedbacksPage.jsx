import React, { useEffect, useState } from 'react';
import { MessageSquare, Star, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { motion } from 'framer-motion';
import axios from 'axios';
import { TESTIMONIAL_API_END_POINT } from '@/utils/constant';

const TestimonialCard = ({ testimonial }) => {
    const [expanded, setExpanded] = useState(false);
    const content = testimonial.content || '';
    const isLong = content.length > 200;

    return (
        <div className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-200">
            <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage
                        src={testimonial.student?.profile?.profilePhoto || "https://ui-avatars.com/api/?name=" + encodeURIComponent(testimonial.student?.fullname || 'S')}
                    />
                </Avatar>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">{testimonial.student?.fullname}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.collegeName}</p>
                </div>
                {testimonial.company?.logo && (
                    <Avatar className="w-8 h-8 rounded-lg"><AvatarImage src={testimonial.company.logo} /></Avatar>
                )}
            </div>

            <div className="flex items-center gap-2 mb-3">
                <p className="text-xs text-primary font-medium">{testimonial.internshipTitle}</p>
                <span className="text-[10px] text-muted-foreground">at {testimonial.company?.name}</span>
            </div>

            {testimonial.rating && (
                <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} />
                    ))}
                </div>
            )}

            <div className="relative">
                <Quote size={16} className="text-primary/20 absolute -top-1 -left-1" />
                <p className={`text-sm text-muted-foreground leading-relaxed pl-4 ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
                    {content}
                </p>
                {isLong && (
                    <button onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline pl-4">
                        {expanded ? <><ChevronUp size={12} />Show less</> : <><ChevronDown size={12} />Read more</>}
                    </button>
                )}
            </div>
        </div>
    );
};

const FeedbacksPage = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await axios.get(`${TESTIMONIAL_API_END_POINT}/get`);
                if (res.data.success) {
                    setTestimonials(res.data.testimonials || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchTestimonials();
    }, []);

    const demoTestimonials = [
        {
            _id: 'd1',
            student: { fullname: 'Priya Sharma', profile: { profilePhoto: '' } },
            company: { name: 'Tech Japan Inc.', logo: '' },
            collegeName: 'IIT Delhi',
            internshipTitle: 'Software Engineering Intern',
            content: 'The internship at Tech Japan was a transformative experience. I worked on cutting-edge technologies and the mentorship was exceptional. The cultural exchange between India and Japan gave me a global perspective that I carry in my career today. The team was incredibly welcoming and the work was both challenging and rewarding.',
            rating: 5
        },
        {
            _id: 'd2',
            student: { fullname: 'Rahul Verma', profile: { profilePhoto: '' } },
            company: { name: 'Sony Corporation', logo: '' },
            collegeName: 'NIT Trichy',
            internshipTitle: 'Hardware Design Intern',
            content: 'Working at Sony was a dream come true. The exposure to world-class manufacturing processes and the chance to contribute to real products was incredible. I highly recommend Job-O-Hire for anyone looking for global opportunities.',
            rating: 5
        },
        {
            _id: 'd3',
            student: { fullname: 'Ananya Patel', profile: { profilePhoto: '' } },
            company: { name: 'Rakuten', logo: '' },
            collegeName: 'BITS Pilani',
            internshipTitle: 'Data Science Intern',
            content: 'Job-O-Hire connected me with an amazing opportunity at Rakuten. The application process was smooth, and the platform kept me updated at every step. The data science team in Tokyo was fantastic!',
            rating: 4
        }
    ];

    const allTestimonials = testimonials.length > 0 ? testimonials : demoTestimonials;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
                <div className="w-12 h-12 rounded-full gradient-border flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    Here's what your seniors have to say!!
                </h1>
                <p className="text-sm text-muted-foreground">
                    Read success stories from students who found amazing global opportunities through Job-O-Hire
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allTestimonials.map((testimonial, i) => (
                    <motion.div
                        key={testimonial._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                        <TestimonialCard testimonial={testimonial} />
                    </motion.div>
                ))}
            </div>

            <div className="text-center glass-card rounded-xl p-8 max-w-lg mx-auto">
                <h3 className="text-lg font-semibold text-foreground mb-2">Share Your Story</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Did you complete an internship through Job-O-Hire? Share your experience and inspire others!
                </p>
                <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    Write a Testimonial
                </button>
            </div>
        </div>
    );
};

export default FeedbacksPage;
