
import React, { useState } from 'react';
import { generateFingerprint, formatTimestamp } from '../utils/crypto';
import { findProofByFingerprint } from '../services/storageService';
import { VerificationStatus, OriginalityProof } from '../types';

const VerifyContent: React.FC = () => {
  const [content, setContent] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState<VerificationStatus>('IDLE');
  const [matchingProof, setMatchingProof] = useState<OriginalityProof | null>(null);

  const handleVerify = async () => {
    if (!content.trim()) return;

    setIsVerifying(true);
    setStatus('IDLE');
    setMatchingProof(null);

    try {
      const currentFingerprint = await generateFingerprint(content);
      const found = findProofByFingerprint(currentFingerprint);

      setTimeout(() => {
        if (found) {
          setStatus('MATCH');
          setMatchingProof(found);
        } else {
          setStatus('MISMATCH');
        }
        setIsVerifying(false);
      }, 800);
    } catch (error) {
      console.error('Verification failed', error);
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-slate-900">Verify Originality</h2>
        <p className="text-slate-500 text-lg">Instantly confirm if a piece of content matches a previously registered proof.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste content to verify..."
          rows={6}
          className="w-full px-6 py-6 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 outline-none transition-all font-mono text-sm rounded-2xl placeholder:text-slate-400"
        />

        <button
          onClick={handleVerify}
          disabled={!content.trim() || isVerifying}
          className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
            !content.trim() || isVerifying 
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.99] shadow-lg shadow-indigo-200'
          }`}
        >
          {isVerifying ? (
            <><i className="fas fa-microscope animate-spin"></i> Cross-Referencing Records...</>
          ) : (
            <><i className="fas fa-shield-check"></i> Authenticate Content</>
          )}
        </button>

        {status === 'MATCH' && matchingProof && (
          <div className="mt-8 p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-100 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-200">
                <i className="fas fa-check-double"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-900 tracking-tight">Authenticity Confirmed</h3>
                <p className="text-emerald-700 font-medium">This content is identical to the registered original.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Registration Date</span>
                <p className="font-bold text-slate-800">{formatTimestamp(new Date(matchingProof.timestamp))}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Proof Label</span>
                <p className="font-bold text-slate-800 truncate">{matchingProof.label}</p>
              </div>
            </div>
          </div>
        )}

        {status === 'MISMATCH' && (
          <div className="mt-8 p-8 bg-rose-50 rounded-2xl border-2 border-rose-100 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-200">
                <i className="fas fa-circle-exclamation"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rose-900 tracking-tight">Integrity Mismatch</h3>
                <p className="text-rose-700 font-medium">The fingerprint does not match any known records.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyContent;
