import React, { useState } from "react";
import { Check, X, TrendingUp } from "lucide-react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const JobSeekerSection: React.FC = () => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    salary: "",
    experience: "",
    skills: "",
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
    <section
      id="job-seekers"
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
    >
      <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <TrendingUp className="h-12 w-12 text-purple-500" />
          </div>
          <div className="pl-2">
            <h3 className="text-2xl font-bold text-slate-800">
              For Job Seekers
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Quickly assess candidate fit and determine appropriate
              compensation
            </p>
          </div>
        </div>

        {!showResults ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="e.g., Google"
            />

            <Input
              label="Offered Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="e.g., Senior Frontend Developer"
            />

            <Input
              label="Offered Salary (Optional)"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., 120000"
              type="number"
            />

            <Input
              label="Experience Asked (Years)"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="e.g., 5"
              type="number"
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Skills Asked
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                placeholder="e.g., React, TypeScript, Node.js"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                rows={5}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Check If It's Worth It
            </Button>
          </form>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-1">
                Estimated Salary Range
              </h4>
              <p className="text-2xl font-bold text-slate-800">
                $110,000 - $135,000
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-1">
                Work Culture Snippets
              </h4>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="italic text-slate-700">
                  "Great work-life balance with flexible hours."
                </p>
                <p className="italic text-slate-700 mt-2">
                  "Opportunities for growth but can be competitive."
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-1">
                Company Reviews
              </h4>
              <a href="#" className="text-blue-500 hover:underline">
                View on Glassdoor
              </a>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-green-800">Worth It</h4>
                <p className="text-green-700 text-sm">
                  This offer aligns well with your experience and market value.
                </p>
              </div>
            </div>

            <Button
              variant="white"
              size="md"
              onClick={() => setShowResults(false)}
              className="w-full"
            >
              Try Another Offer
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobSeekerSection;
