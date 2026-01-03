
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CreateProof from './CreateProof';
import ProofVault from './ProofVault';
import VerifyContent from './VerifyContent';
import { getStoredProofs } from '../services/storageService';
import { OriginalityProof } from '../types';

const OriginXApp: React.FC = () => {
  const [proofs, setProofs] = useState<OriginalityProof[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'verify' | 'list'>('create');

  useEffect(() => {
    refreshProofs();
  }, []);

  const refreshProofs = () => {
    setProofs(getStoredProofs());
  };

  return (
    <Layout>
      {/* Dynamic Tab Navigation */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-12 max-w-md mx-auto shadow-inner border border-slate-200">
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            activeTab === 'create' 
              ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200/50' 
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Register
        </button>
        <button
          onClick={() => setActiveTab('verify')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            activeTab === 'verify' 
              ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200/50' 
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Verify
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            activeTab === 'list' 
              ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200/50' 
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Vault
        </button>
      </div>

      {/* Main Experience */}
      <div className="min-h-[500px]">
        {activeTab === 'create' && <CreateProof onProofCreated={refreshProofs} />}
        {activeTab === 'verify' && <VerifyContent />}
        {activeTab === 'list' && <ProofVault proofs={proofs} />}
      </div>

      {/* Reimagined Value Cards */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Absolute Privacy</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Your work never leaves your side. We only process the cryptographic fingerprint, ensuring your content remains 100% private.
            </p>
          </div>
        </div>
        
        <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group scale-105 md:scale-110">
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-white mb-2">Attribution Records</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              An immutable timestamp is your claim to originality. Secure your place in history before you share with the world.
            </p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Trust by Design</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Validate authenticity in seconds. Built on mathematical certainty, not legal jargon. Verified by anyone, owned by you.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OriginXApp;
