import React, { useState } from "react";
import { Check, Github, Linkedin, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';


// Initialize the Google GenAI with your API key
const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
});


const Dashboard: React.FC = () => {
  // Helper function to get currency symbol
  const getCurrencySymbol = (currency: string): string => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "INR":
        return "₹";
      default:
        return "$";
    }
  };
  // State for active tab
  const [activeTab, setActiveTab] = useState<"candidate" | "company">(
    "candidate"
  );

  // State for candidate form
  const [candidateForm, setCandidateForm] = useState({
    company: "",
    position: "",
    salary: "",
    experience: "",
    skills: "",
    currency: "USD", // Default currency
  });

  // State for company form
  const [companyForm, setCompanyForm] = useState({
    resume: "",
    github: "",
    linkedin: "",
  });

  // Loading states
  const [candidateLoading, setCandidateLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);

  // Results states
  const [candidateResults, setCandidateResults] = useState<any>(null);
  const [companyResults, setCompanyResults] = useState<any>(null);

  // Handle candidate form changes
  const handleCandidateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCandidateForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle company form changes
  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle candidate form submission
  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateLoading(true);

    try {
      // Prepare the data to send to Gemini API
      const promptData = {
        company: candidateForm.company,
        position: candidateForm.position,
        salary: candidateForm.salary,
        experience: candidateForm.experience,
        skills: candidateForm.skills,
        currency: candidateForm.currency,
      };

      // Create a prompt for the Gemini model
      const prompt = `You are an assistant helping a job seeker evaluate whether a job offer is worth it.

Input:
- Company Name: {Company Name}
- Offered Position: {Offered Position}
- Offered Salary: {Offered Salary or "Not Provided"} in ${candidateForm.currency}
- Experience Asked: {Experience Required}
- Skills Asked: {Comma-separated list of skills}

Your tasks:
1. Estimate a reasonable salary range for the given role and company based on market data.
2. Extract 2–3 recent work culture review snippets from a reliable source (like Glassdoor).
3. Provide a direct link to the company’s review page on that source.
4. Perform a “Worth It” analysis comparing the offered salary to your estimated range and comparing the experience and skills asked to typical standards.
5. Also provide:
   - Company stock symbol (if publicly listed).
   - Current stock value (approximate is fine).
   - Average signing bonus for this role at this company.
   - Ease of promotion (based on reviews or reputation, e.g., Easy, Moderate, Difficult).
   - Perks offered (summarize common perks).
   - Typical annual bonus (average percentage or range, if available).
6. Suggest 4–5 potential **interview questions** that are commonly asked for this role and skill set.
7. Provide **cross-section advice** on how the recruiter may perceive the candidate’s profile based on the data.
8. Offer **negotiation guidance**:
   - Should the candidate negotiate the offer?
   - If yes, what is the **negotiation margin/limit** (as % or fixed amount)?

Return everything in **JSON format**, using the following schema:

{
  "estimated_salary_range": {
    "min": "${getCurrencySymbol(promptData.currency)}XXXX",
    "max": "${getCurrencySymbol(promptData.currency)}YYYY",
    "source": "e.g., Glassdoor, Levels.fyi"
  },
  "culture_snippets": [
    "Snippet 1",
    "Snippet 2"
  ],
  "review_link": "https://www.glassdoor.com/Overview/company-name",
  "worth_it_analysis": {
    "salary_comparison": "Above/Below/Within market average",
    "experience_commentary": "Comment on whether experience asked is standard or demanding",
    "skills_commentary": "Comment on whether the skills are niche, common, or highly in-demand"
  },
  "company_insights": {
    "stock_symbol": "e.g., GOOG",
    "stock_value": "$XXXX",
    "average_signing_bonus": "$XXXX",
    "promotion_ease": "Easy/Moderate/Difficult",
    "perks": [
      "e.g., Free meals", 
      "Flexible hours", 
      "Health insurance"
    ],
    "annual_bonus": "e.g., 10% of base salary"
  },
  "interview_questions": [
    "Sample interview question 1",
    "Sample interview question 2",
    "Sample interview question 3",
    "Sample interview question 4"
  ],
  "recruiter_cross_section": "Brief insight into how a recruiter would view this candidate profile based on experience, skills, and fit.",
  "negotiation_guidance": {
    "should_negotiate": true,
    "recommended_margin": "e.g., 8–12% increase or ₹50,000 more based on market data"
  }
}     
  
Job details: ${JSON.stringify(promptData)}`;

      // Call the Gemini model
      const model = genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const result = await model;

      // Parse the JSON response from the text
      let jsonResponse;
      try {
        // Extract JSON from the text response
        const responseText = result.text;
        // Find JSON content (assuming it's wrapped in ```json and ``` or just plain JSON)
        const jsonMatch = responseText?.match(/```json\n([\s\S]*?)\n```/) ||
          responseText?.match(/```([\s\S]*?)```/) || [null, responseText];

        jsonResponse =
          jsonMatch && jsonMatch[1] ? JSON.parse(jsonMatch[1].trim()) : null;
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Failed to parse AI response");
      }

      // Set the results
      setCandidateResults(jsonResponse);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Show error state
      setCandidateResults({
        error: true,
        message: "Failed to analyze job offer. Please try again.",
      });
    } finally {
      setCandidateLoading(false);
    }
  };

  // Handle company form submission
  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyLoading(true);

    // Simulate API call
    setTimeout(() => {
      setCompanyResults({
        skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"],
        salaryRange: "$115,000 - $140,000",
        experience: "5+ years",
        strengths: [
          "Extensive experience with modern JavaScript frameworks",
          "Consistent GitHub contributions (15+ repositories)",
          "Demonstrated leadership in previous roles",
        ],
        strongCandidate: true,
      });
      setCompanyLoading(false);
    }, 1500);
  };

  // Reset candidate form and results
  const resetCandidateForm = () => {
    setCandidateForm({
      company: "",
      position: "",
      salary: "",
      experience: "",
      skills: "",
      currency: "USD", // Keep the default currency
    });
    setCandidateResults(null);
  };

  // Reset company form and results
  const resetCompanyForm = () => {
    setCompanyForm({
      resume: "",
      github: "",
      linkedin: "",
    });
    setCompanyResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-blue-600 hover:underline">
              Worthy.ai
            </h1>
          </Link>
          <nav>
            <UserButton afterSignOutUrl="/" />
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Your Dashboard
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab("candidate")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "candidate"
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Job Seeker
            </button>
            <button
              onClick={() => setActiveTab("company")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "company"
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Employer
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {/* Candidate Section */}
          {activeTab === "candidate" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Job Seeker
                </h3>
                <p className="text-slate-600 mb-6">
                  Evaluate if a job offer truly matches your worth in the
                  current market
                </p>

                {!candidateResults ? (
                  <form onSubmit={handleCandidateSubmit} className="space-y-5">
                    <Input
                      label="Company Name"
                      name="company"
                      value={candidateForm.company}
                      onChange={handleCandidateChange}
                      required
                      placeholder="e.g., Google"
                    />

                    <Input
                      label="Offered Position"
                      name="position"
                      value={candidateForm.position}
                      onChange={handleCandidateChange}
                      required
                      placeholder="e.g., Senior Frontend Developer"
                    />

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          label="Offered Salary (Optional)"
                          name="salary"
                          value={candidateForm.salary}
                          onChange={handleCandidateChange}
                          placeholder="e.g., 120000"
                          type="number"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Currency
                        </label>
                        <select
                          name="currency"
                          value={candidateForm.currency}
                          onChange={handleCandidateChange}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="INR">INR (₹)</option>
                        </select>
                      </div>
                    </div>

                    <Input
                      label="Experience Asked (Years)"
                      name="experience"
                      value={candidateForm.experience}
                      onChange={handleCandidateChange}
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
                        value={candidateForm.skills}
                        onChange={handleCandidateChange}
                        required
                        placeholder="e.g., React, TypeScript, Node.js"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={candidateLoading}
                    >
                      {candidateLoading
                        ? "Analyzing..."
                        : "Check If It's Worth It"}
                    </Button>
                  </form>
                ) : candidateLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                    <p className="text-slate-600">
                      Analyzing your job offer...
                    </p>
                  </div>
                ) : candidateResults.error ? (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
                      <p className="text-red-700 mb-4">
                        {candidateResults.message}
                      </p>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={resetCandidateForm}
                        className="w-full"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Salary Range Section */}
                    {candidateResults.estimated_salary_range && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-medium text-slate-500 mb-1">
                          Estimated Salary Range
                        </h4>
                        <p className="text-2xl font-bold text-slate-800">
                          {candidateResults.estimated_salary_range.min} -{" "}
                          {candidateResults.estimated_salary_range.max}
                        </p>
                        {candidateResults.estimated_salary_range.source && (
                          <p className="text-xs text-slate-500 mt-1">
                            Source:{" "}
                            {candidateResults.estimated_salary_range.source}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Worth It Analysis */}
                    {candidateResults.worth_it_analysis && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-medium text-slate-500 mb-2">
                          Worth It Analysis
                        </h4>
                        <div className="space-y-3">
                          {candidateResults.worth_it_analysis
                            .salary_comparison && (
                            <div className="flex items-start">
                              <div className="bg-blue-100 p-1 rounded-full mr-2">
                                <Check className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-700">
                                  <span className="font-medium">Salary: </span>
                                  {
                                    candidateResults.worth_it_analysis
                                      .salary_comparison
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                          {candidateResults.worth_it_analysis
                            .experience_commentary && (
                            <div className="flex items-start">
                              <div className="bg-blue-100 p-1 rounded-full mr-2">
                                <Check className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-700">
                                  <span className="font-medium">
                                    Experience:{" "}
                                  </span>
                                  {
                                    candidateResults.worth_it_analysis
                                      .experience_commentary
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                          {candidateResults.worth_it_analysis
                            .skills_commentary && (
                            <div className="flex items-start">
                              <div className="bg-blue-100 p-1 rounded-full mr-2">
                                <Check className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-700">
                                  <span className="font-medium">Skills: </span>
                                  {
                                    candidateResults.worth_it_analysis
                                      .skills_commentary
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Culture Snippets */}
                    {candidateResults.culture_snippets &&
                      candidateResults.culture_snippets.length > 0 && (
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="text-sm font-medium text-slate-500 mb-2">
                            Work Culture Insights
                          </h4>
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            {candidateResults.culture_snippets.map(
                              (snippet: string, i: number) => (
                                <p
                                  key={i}
                                  className="italic text-slate-700 mt-2 first:mt-0"
                                >
                                  {snippet}
                                </p>
                              )
                            )}
                          </div>
                          {candidateResults.review_link && (
                            <a
                              href={candidateResults.review_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                            >
                              Read more reviews →
                            </a>
                          )}
                        </div>
                      )}

                    {/* Company Insights */}
                    {candidateResults.company_insights && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-medium text-slate-500 mb-2">
                          Company Insights
                        </h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {candidateResults.company_insights.stock_symbol && (
                            <div>
                              <p className="text-xs text-slate-500">
                                Stock Symbol
                              </p>
                              <p className="text-sm font-medium">
                                {candidateResults.company_insights.stock_symbol}
                              </p>
                            </div>
                          )}
                          {candidateResults.company_insights.stock_value && (
                            <div>
                              <p className="text-xs text-slate-500">
                                Stock Value - ( 1 Month Average )
                              </p>
                              <p className="text-sm font-medium">
                                {candidateResults.company_insights.stock_value}
                              </p>
                            </div>
                          )}
                          {candidateResults.company_insights
                            .average_signing_bonus && (
                            <div>
                              <p className="text-xs text-slate-500">
                                Avg. Signing Bonus
                              </p>
                              <p className="text-sm font-medium">
                                {
                                  candidateResults.company_insights
                                    .average_signing_bonus
                                }
                              </p>
                            </div>
                          )}
                          {candidateResults.company_insights.promotion_ease && (
                            <div>
                              <p className="text-xs text-slate-500">
                                Promotion Ease
                              </p>
                              <p className="text-sm font-medium">
                                {
                                  candidateResults.company_insights
                                    .promotion_ease
                                }
                              </p>
                            </div>
                          )}
                          {candidateResults.company_insights.annual_bonus && (
                            <div>
                              <p className="text-xs text-slate-500">
                                Annual Bonus
                              </p>
                              <p className="text-sm font-medium">
                                {candidateResults.company_insights.annual_bonus}
                              </p>
                            </div>
                          )}
                        </div>
                        {candidateResults.company_insights.perks &&
                          candidateResults.company_insights.perks.length >
                            0 && (
                            <div>
                              <p className="text-xs text-slate-500 mb-2">
                                Perks & Benefits
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {candidateResults.company_insights.perks.map(
                                  (perk: string, i: number) => (
                                    <span
                                      key={i}
                                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs"
                                    >
                                      {perk}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Interview Questions */}
                    {candidateResults.interview_questions &&
                      candidateResults.interview_questions.length > 0 && (
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="text-sm font-medium text-slate-500 mb-2">
                            Potential Interview Questions
                          </h4>
                          <div className="space-y-2">
                            {candidateResults.interview_questions.map(
                              (question: string, i: number) => (
                                <div
                                  key={i}
                                  className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                                >
                                  <p className="text-sm text-slate-700">
                                    {question}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Recruiter Cross Section */}
                    {candidateResults.recruiter_cross_section && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-medium text-slate-500 mb-2">
                          Recruiter's Perspective
                        </h4>
                        <p className="text-sm text-slate-700 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                          {candidateResults.recruiter_cross_section}
                        </p>
                      </div>
                    )}

                    {/* Negotiation Guidance */}
                    {candidateResults.negotiation_guidance && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-medium text-slate-500 mb-2">
                          Negotiation Guidance
                        </h4>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-blue-800 mb-1">
                            {candidateResults.negotiation_guidance
                              .should_negotiate
                              ? "You should negotiate this offer"
                              : "This offer is already competitive"}
                          </p>
                          {candidateResults.negotiation_guidance
                            .recommended_margin && (
                            <p className="text-sm text-blue-700">
                              Recommended ask:{" "}
                              {
                                candidateResults.negotiation_guidance
                                  .recommended_margin
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      variant="primary"
                      size="md"
                      onClick={resetCandidateForm}
                      className="w-full mt-4"
                    >
                      Analyze Another Offer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Company Section */}
          {activeTab === "company" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Employer
                </h3>
                <p className="text-slate-600 mb-6">
                  Quickly assess candidate fit and determine appropriate
                  compensation
                </p>

                {!companyResults ? (
                  companyLoading ? (
                    <div className="text-center text-slate-600 text-lg">
                      🚧 Feature currently under development, stay tuned!
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setCompanyLoading(true);
                        setTimeout(() => {
                          setCompanyLoading(false);
                          setCompanyResults(true); // just to re-render
                        }, 1500);
                      }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Resume Text
                        </label>
                        <textarea
                          name="resume"
                          required
                          placeholder="Paste resume text here..."
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                          rows={6}
                        />
                      </div>
                      <Input
                        label="GitHub Profile Link (Optional)"
                        name="github"
                        value={companyForm.github}
                        onChange={handleCompanyChange}
                        placeholder="e.g., https://github.com/username"
                        icon={<Github className="h-5 w-5 text-slate-400" />}
                      />

                      <Input
                        label="LinkedIn Profile Link (Optional)"
                        name="linkedin"
                        value={companyForm.linkedin}
                        onChange={handleCompanyChange}
                        placeholder="e.g., https://linkedin.com/in/username"
                        icon={<Linkedin className="h-5 w-5 text-slate-400" />}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full bg-teal-500 hover:bg-teal-600"
                      >
                        Analyze Candidate
                      </Button>
                    </form>
                  )
                ) : (
                  <div className="text-center text-slate-600 text-lg">
                    🚧 Feature currently under development, stay tuned!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="mt-16 py-8 bg-slate-800 text-slate-400 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Worthy.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
