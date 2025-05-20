import React, { useState } from "react";
import {
  Upload,
  Github,
  Linkedin,
  Building2,
  FileText,
  Users,
} from "lucide-react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const CompanySection: React.FC = () => {
  const [formData, setFormData] = useState({
    description: "", // Assuming you have a description field in your form
    resume: "",
    github: "",
    linkedin: "",
  });

  const [showResults, setShowResults] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <motion.section
      id="companies"
      className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <div className="p-6 md:p-8 relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Building2 className="h-12 w-12 text-purple-500" />
          </div>
          <div className="pl-2">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              For Companies
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Quickly assess candidate fit and determine appropriate
              compensation
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resume Text
                </label>
                <div className="relative">
                  <textarea
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    required
                    placeholder="Paste resume text here..."
                    className="w-full p-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    rows={5}
                  />
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resume Text
                </label>
                <div className="relative">
                  <textarea
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    required
                    placeholder="Paste resume text here..."
                    className="w-full p-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    rows={5}
                  />
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  GitHub Profile Link (Optional)
                </label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="GitHub profile URL"
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-white dark:bg-slate-700 text-slate-900 dark:text-white mb-4"
                />
              </div>

              <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                LinkedIn Profile Link (Optional)
              </label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn profile URL"
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-white dark:bg-slate-700 text-slate-900 dark:text-white mb-4"
              />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Analyze Candidate
              </Button>
            </motion.form>
          ) : (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl">
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "React",
                    "TypeScript",
                    "Node.js",
                    "GraphQL",
                    "AWS",
                    "Docker",
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-200 dark:border-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Suggested Salary Range
                </h4>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  $115,000 - $140,000
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Based on 5+ years of experience and skill set
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-400">
                    Strong Candidate
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Active GitHub contributions and relevant technical
                    experience.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                  Strengths
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                    Extensive experience with modern JavaScript frameworks
                  </li>
                  <li className="flex items-center text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                    Consistent GitHub contributions (15+ repositories)
                  </li>
                  <li className="flex items-center text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                    Demonstrated leadership in previous roles
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="md"
                onClick={() => setShowResults(false)}
                className="w-full"
              >
                Analyze Another Candidate
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default CompanySection;
