import React, { useState } from 'react';
import { ChevronRight, UserCircle, BarChart3, Target, Rocket, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const Timeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps: TimelineStep[] = [
    {
      title: "Create Your Profile",
      description: "Set up your professional profile with your experience, skills, and career goals. Our AI will analyze your background to provide personalized insights.",
      icon: <UserCircle className="w-6 h-6" />,
      color: "text-blue-500",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Input Your Data",
      description: "Enter your current compensation details, including salary, benefits, and equity. We'll compare it with real-time market data from similar roles.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-purple-500",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Get Market Insights",
      description: "Receive comprehensive analysis of your market position, including salary ranges, benefits comparison, and industry trends specific to your role.",
      icon: <Target className="w-6 h-6" />,
      color: "text-pink-500",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      title: "Take Action",
      description: "Use our AI-powered insights to negotiate better compensation or make informed career decisions. Get personalized recommendations for your next steps.",
      icon: <Rocket className="w-6 h-6" />,
      color: "text-indigo-500",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Your Journey to Better Compensation
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Follow these simple steps to understand your true market value and make data-driven career decisions
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="h-1 w-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Steps */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ 
                      opacity: activeStep >= index ? 1 : 0.5,
                      x: 0,
                      scale: activeStep === index ? 1.05 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-start mb-12 last:mb-0 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center relative z-10 shadow-lg`}>
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <motion.div
                      className={`flex-1 ${
                        index % 2 === 0 ? 'ml-8 text-left' : 'mr-8 text-right'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className={`text-xl font-semibold ${step.color} mb-2`}>
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation buttons */}
          <motion.div 
            className="flex justify-center mt-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-3 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center gap-2 disabled:opacity-50 hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;