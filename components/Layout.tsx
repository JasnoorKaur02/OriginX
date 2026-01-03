
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-16 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-2xl mb-6 shadow-xl shadow-slate-200">
            <i className="fas fa-fingerprint text-white text-xl"></i>
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-3">OriginX</h1>
          <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
            The standard for <span className="text-slate-900 font-semibold underline decoration-indigo-500 underline-offset-4">creative attribution</span>. 
            Secure your first-creation proof without ever uploading your files.
          </p>
        </div>
      </header>
      
      <main className="min-h-[60vh]">{children}</main>
      
      <footer className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          OriginX Protocol Active
        </div>
        <p className="text-slate-500 font-medium tracking-tight">
          Crafted for the creators of tomorrow.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
