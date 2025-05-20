import React from 'react';
import { Activity, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-blue-400 mr-2" />
              <span className="font-bold text-xl">Worthy.ai</span>
            </div>
            <p className="text-slate-400 mb-4">
              Know your worth in the job market with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Salary Insights</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Company Reviews</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Worth-It Analysis</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Job Matching</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Candidate Analysis</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Talent Insights</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Skill Mapping</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Compensation Tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Worthy.ai, Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;