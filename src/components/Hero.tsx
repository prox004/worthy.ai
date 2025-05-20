import React from 'react';
import { ArrowRight, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';



const StatBox = ({ icon: Icon, value, label }: { icon: any; value: string; label: string }) => (
  <div className="group relative h-full">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
    <div className="relative h-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform transition-all duration-300 group-hover:scale-105 group-hover:border-white/30 flex flex-col justify-between">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="p-4 bg-white/10 rounded-xl flex-shrink-0">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="text-white/80 text-lg">{label}</div>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right orb */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float-slow" />

        {/* Bottom left orb */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float-slow-delayed" />

        {/* Center orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white py-2 px-4 rounded-full mb-6 border border-white/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">Beta Release</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Know Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
              True Worth
            </span>{" "}
            in the Job Market
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Make data-driven decisions about your career. Get real-time market
            insights, salary benchmarks, and expert guidance to maximize your
            earning potential.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button
              variant="white"
              size="lg"
              className="group"
              onClick={() => navigate("/dashboard")}
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Learn More
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatBox
              icon={TrendingUp}
              value="2,500+"
              label="Salary Data Points"
            />
            <StatBox icon={Users} value="87%" label="Accuracy Rate" />
            <StatBox icon={Shield} value="5,000+" label="Companies" />
            <StatBox icon={Zap} value="15k+" label="Happy Users" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;