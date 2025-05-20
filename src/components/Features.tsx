import React from 'react';
import { DollarSign, Briefcase, LineChart, Users } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-blue-500" />,
      title: "Salary Intelligence",
      description: "Get accurate salary ranges based on skill set, experience, and market demand."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-500" />,
      title: "Company Culture Insights",
      description: "Discover what it's really like to work at your target company before accepting an offer."
    },
    {
      icon: <LineChart className="h-8 w-8 text-blue-500" />,
      title: "Candidate Analysis",
      description: "Quickly assess potential hires based on their skills, GitHub activity, and LinkedIn profile."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Worth-It Analysis",
      description: "Get a clear yes or no on whether a job offer aligns with your skills and market value."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Worthy.ai Works</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our platform provides data-driven insights for both job seekers and companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;