import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-50 mb-4 group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-xl text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default FeatureCard;