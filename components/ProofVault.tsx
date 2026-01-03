
import React from 'react';
import { OriginalityProof } from '../types';
import { formatTimestamp } from '../utils/crypto';

interface ProofVaultProps {
  proofs: OriginalityProof[];
}

const ProofVault: React.FC<ProofVaultProps> = ({ proofs }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-slate-900">Your Proof Vault</h2>
          <p className="text-slate-500">Secure digital certificates for your creative history.</p>
        </div>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-full">
          {proofs.length} Assets Secured
        </div>
      </div>

      {proofs.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] py-24 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <i className="fas fa-lock-open text-slate-300 text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-600 mb-2">The vault is empty</h3>
          <p className="text-slate-400 max-w-xs mx-auto">Generate your first Proof of Creation to start building your attribution history.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofs.map((proof) => (
            <div 
              key={proof.id} 
              className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between h-[280px]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                    <i className="fas fa-cube"></i>
                  </div>
                  <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                    <i className="fas fa-ellipsis"></i>
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {proof.label}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">{formatTimestamp(new Date(proof.timestamp))}</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-auto">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-colors">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Fingerprint ID</span>
                  <p className="font-mono text-[10px] text-slate-500 break-all leading-relaxed">
                    {proof.fingerprint.slice(0, 12)}...{proof.fingerprint.slice(-12)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  IMMUTABLE RECORD
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProofVault;
