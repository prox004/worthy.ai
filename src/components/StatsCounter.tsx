import React, { useState, useEffect } from 'react';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const Stat: React.FC<StatProps> = ({ value, label, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-slate-600">{label}</div>
    </div>
  );
};

const StatsCounter: React.FC = () => {
  const stats = [
    { value: 2500, label: "Salary Data Points", suffix: "+" },
    { value: 87, label: "Accuracy Rate", suffix: "%" },
    { value: 5000, label: "Companies Covered", suffix: "+" },
    { value: 15, label: "Happy Users", suffix: "k+" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter; 