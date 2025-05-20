import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Button from './ui/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Market Insights
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Get weekly updates on salary trends, market analysis, and career tips
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="white"
                className="whitespace-nowrap"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            
            {status === 'success' && (
              <p className="mt-4 text-green-200">
                Thanks for subscribing! Please check your email to confirm.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-200">
                Something went wrong. Please try again.
              </p>
            )}
          </form>

          <p className="mt-6 text-sm text-blue-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 