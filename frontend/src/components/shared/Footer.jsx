import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-border py-8 bg-card">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded gradient-border flex items-center justify-center">
                                <span className="text-white font-bold text-[7px]">JOH</span>
                            </div>
                            <h2 className="text-lg font-bold text-foreground">Job-O-Hire</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">2026 Job-O-Hire. Connecting talent globally.</p>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {['Privacy', 'Terms', 'Contact'].map(link => (
                            <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
