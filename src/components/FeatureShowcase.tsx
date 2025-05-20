import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Shield, 
  Zap, 
  TrendingUp, 
  MessageSquare 
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features: Feature[] = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data-Driven Insights",
      description: "Access comprehensive salary data and market trends to make informed decisions.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Company Comparisons",
      description: "Compare compensation packages across different companies and industries.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your data is encrypted and protected with enterprise-grade security.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Updates",
      description: "Get instant notifications about market changes and new opportunities.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Track your career progression and salary growth over time.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Expert Support",
      description: "Get personalized advice from our team of compensation experts.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Powerful Features for Your Career
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to understand and maximize your market value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer ${
                activeFeature === index ? 'z-10' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl transform transition-transform duration-300 ${
                  activeFeature === index ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="relative p-8 bg-white rounded-2xl shadow-lg transform transition-transform duration-300 group-hover:-translate-y-2">
                <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase; 