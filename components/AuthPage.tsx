
import React, { useState } from 'react';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 1200);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl shadow-2xl shadow-emerald-500/20">
            <i className="fas fa-check"></i>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white">Access Granted</h2>
            <p className="text-slate-400 font-medium">Welcome back, creator. Your vault is ready.</p>
          </div>
          <button 
            onClick={onAuthSuccess}
            className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
          >
            Go to OriginX App
            <i className="fas fa-arrow-right text-sm"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="absolute top-12 left-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </button>
      </div>

      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-10 border border-slate-100">
        <div className="text-center mb-10 space-y-2">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <i className="fas fa-fingerprint"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            {mode === 'signup' ? 'Join OriginX' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            {mode === 'signup' ? 'Start securing your creative assets today.' : 'Manage your attribution history.'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@example.com"
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 outline-none rounded-2xl transition-all font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 outline-none rounded-2xl transition-all font-medium"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-slate-200 mt-4 active:scale-[0.98] disabled:bg-slate-200 disabled:shadow-none"
          >
            {isLoading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              mode === 'signup' ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <button 
            onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
            className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
          >
            {mode === 'signup' ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
