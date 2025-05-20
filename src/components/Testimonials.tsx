import React from 'react';
import AnimatedTestimonialsDemo from './animated-testimonials-demo';

const Testimonials: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            See how Worthy AI is transforming careers and helping companies make data-driven compensation decisions
          </p>
        </div>
        
        <AnimatedTestimonialsDemo />
      </div>
    </section>
  );
};

export default Testimonials; 