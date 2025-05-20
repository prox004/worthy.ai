import React, { useState } from 'react';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import Button from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for individuals just starting out",
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      "Basic salary insights",
      "Limited company data",
      "Basic market trends",
      "Email support"
    ],
    color: "blue",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "Ideal for active job seekers",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Advanced salary insights",
      "Full company database access",
      "Detailed market analysis",
      "Priority support",
      "Custom reports",
      "Interview preparation"
    ],
    popular: true,
    color: "purple",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For companies and teams",
    icon: <Building2 className="w-6 h-6" />,
    features: [
      "Everything in Professional",
      "Team collaboration",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Training sessions"
    ],
    color: "pink",
    gradient: "from-pink-500 to-pink-600"
  }
];

const Pricing: React.FC = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the plan that best fits your needs and start your journey to better compensation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0"
                animate={{
                  opacity: hoveredPlan === index ? 0.1 : 0,
                  scale: hoveredPlan === index ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background: `linear-gradient(45deg, ${plan.color === 'blue' ? '#3B82F6' : plan.color === 'purple' ? '#8B5CF6' : '#EC4899'}, ${plan.color === 'blue' ? '#2563EB' : plan.color === 'purple' ? '#7C3AED' : '#DB2777'})`
                }}
              />

              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-1 px-4 rounded-full shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${plan.gradient} text-white`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-600 dark:text-slate-400 ml-1">{plan.period}</span>
                  )}
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6">{plan.description}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-start"
                    >
                      <div className={`p-1 rounded-full bg-${plan.color}-100 dark:bg-${plan.color}-900/50 mr-3`}>
                        <Check className={`w-4 h-4 text-${plan.color}-500 dark:text-${plan.color}-400`} />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
                        : 'bg-slate-50'
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 