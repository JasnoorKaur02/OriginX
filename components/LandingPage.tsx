
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <i className="fas fa-fingerprint"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">OriginX</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onSignIn} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Sign In</button>
          <button onClick={onGetStarted} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-slate-200">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center md:text-left flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-black tracking-[0.2em] uppercase">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                Protocol v1.0 Live
              </div>
              
              {/* BRAND: Larger than headline, extreme weight, more vertical spacing */}
              <div className="text-7xl md:text-[8.5rem] font-[950] text-slate-900 tracking-tighter leading-none mb-10 block">
                OriginX
              </div>

              {/* HEADLINE: Large but supportive to brand */}
              <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-[1.2] tracking-tight">
                Your creativity is unique. <span className="text-indigo-600 italic">Prove it.</span>
              </h1>
              
              {/* SUBHEADING: Reduced size and contrast */}
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed font-medium">
                Establish a verifiable Proof of First Creation in seconds. Secure your attribution without ever uploading your original files.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-slate-300 active:scale-95"
              >
                Secure Your First Proof
              </button>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Free for individual creators.</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative z-10 bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 rounded-xl">
                  <i className="fas fa-cube text-xl"></i>
                </div>
                <div className="text-[10px] font-black tracking-widest opacity-50 uppercase">OriginX Verified</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">Creative Asset #042</div>
                <div className="text-slate-400 text-xs font-mono">ID: 8f2a9c1e...b4d3</div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-2/3"></div>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold">
                <i className="fas fa-circle-check"></i>
                IMMUTABLE FINGERPRINT SECURED
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100/50 rounded-full blur-[100px] -z-10"></div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl font-black text-slate-900">How it works</h2>
            <p className="text-slate-500 font-medium">Math and transparency, designed for creators.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-[2px] bg-slate-100 -z-0"></div>
            
            <div className="relative z-10 text-center space-y-6 group">
              <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl mx-auto flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">
                <i className="fas fa-upload"></i>
              </div>
              <h3 className="text-xl font-bold">Provide Content</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">Paste your text or code. Our protocol processes it locally on your device.</p>
            </div>

            <div className="relative z-10 text-center space-y-6 group">
              <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl mx-auto flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">
                <i className="fas fa-microchip"></i>
              </div>
              <h3 className="text-xl font-bold">Fingerprint</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">A unique SHA-256 digital signature is generated. We never see your raw work.</p>
            </div>

            <div className="relative z-10 text-center space-y-6 group">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl mx-auto flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">
                <i className="fas fa-shield-check"></i>
              </div>
              <h3 className="text-xl font-bold">Verify Anytime</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">Use the signature to prove you are the original creator of that exact iteration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-slate-900 leading-tight">Built for those who value originality.</h2>
                <p className="text-lg text-slate-500 font-medium">The digital world is fast. Attribution shouldn't be complicated.</p>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 flex-shrink-0">
                    <i className="fas fa-eye-slash"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Uncompromising Privacy</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Your content is never uploaded. Fingerprinting happens entirely on your machine.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600 flex-shrink-0">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Instant Proof</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">No bureaucratic delays. Get a timestamped record of your work in milliseconds.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0">
                    <i className="fas fa-share-nodes"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Universal Verification</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Anyone with the original content can verify its authenticity against our protocol.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 relative">
              <div className="space-y-6 pt-12">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                  <div className="text-indigo-600 mb-4 font-black">Writers</div>
                  <p className="text-xs text-slate-500 italic">"Secure your drafts before sending them to publishers."</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white">
                  <div className="text-emerald-400 mb-4 font-black">Designers</div>
                  <p className="text-xs text-slate-400 italic">"Prove the evolution of your concepts and visual assets."</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl text-white">
                  <div className="text-indigo-100 mb-4 font-black">Developers</div>
                  <p className="text-xs text-indigo-200 italic">"Fingerprint unique logic and proprietary algorithms."</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                  <div className="text-blue-600 mb-4 font-black">Creatives</div>
                  <p className="text-xs text-slate-500 italic">"Your ideas deserve a record of existence."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-5xl font-black tracking-tight">Ready to secure your work?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onGetStarted}
              className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95"
            >
              Start For Free
            </button>
            <button 
              onClick={onSignIn}
              className="px-12 py-5 border-2 border-white/20 rounded-2xl font-black text-xl hover:bg-white/10 transition-all"
            >
              Log In
            </button>
          </div>
          <footer className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-50 text-sm">
            <div className="flex items-center gap-2">
              <i className="fas fa-fingerprint"></i>
              <span>OriginX Protocol</span>
            </div>
            <p>Built for creators who care about originality.</p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
