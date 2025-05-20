import Header from "../components/Header";
import Hero from "../components/Hero";
import FeatureShowcase from "../components/FeatureShowcase";
import Timeline from "../components/Timeline";
import JobSeekerSection from "../components/JobSeekerSection";
import CompanySection from "../components/CompanySection";
import Pricing from "../components/Pricing";
import Newsletter from "../components/Newsletter";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { SignedOut,SignedIn, ClerkProvider } from '@clerk/clerk-react'
import DashboardCard from "../components/DashboardCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main>
        <Hero />
        <FeatureShowcase />
        <Timeline />
        <SignedOut>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Try Out Worthy.ai for Free
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Log in or create an account to get started. Get one free report
              every week.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <JobSeekerSection />
            <CompanySection />
          </div>
        </div>
        </SignedOut>
        <SignedIn>
          <DashboardCard />
        </SignedIn>
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
