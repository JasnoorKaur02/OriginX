
import React, { useState, useEffect, useRef } from 'react';
import { generateFingerprint, formatTimestamp } from '../utils/crypto';
import { saveProof } from '../services/storageService';
import { OriginalityProof } from '../types';

interface CreateProofProps {
  onProofCreated: () => void;
}

const CreateProof: React.FC<CreateProofProps> = ({ onProofCreated }) => {
  const [content, setContent] = useState('');
  const [label, setLabel] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<OriginalityProof | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (content.length > 0 && !fileData) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [content, fileData]);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        setFileData(e.target.result);
        setContent(`[FILE SELECTED: ${file.name}]`);
        if (!label) setLabel(file.name.split('.')[0]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileRead(file);
  };

  const handleGenerate = async () => {
    const input = fileData || content;
    if (!input || (typeof input === 'string' && !input.trim())) return;

    setIsProcessing(true);
    try {
      const fingerprint = await generateFingerprint(input);
      const now = new Date();
      const timestamp = now.toISOString();

      const newProof: OriginalityProof = {
        id: crypto.randomUUID(),
        fingerprint,
        timestamp,
        label: label.trim() || 'Untitled Creation'
      };

      saveProof(newProof);
      setLastResult(newProof);
      setContent('');
      setLabel('');
      setFileData(null);
      onProofCreated();
    } catch (error) {
      console.error('Generation failed', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Register Content</h2>
            <p className="text-slate-500">Provide your work to generate a unique digital signature.</p>
          </div>

          <div className="group relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              Title your work
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex: 'Project Phoenix - Final Concept'"
              className="w-full px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all text-lg font-medium placeholder:text-slate-300 shadow-sm"
            />
          </div>

          <div className="group relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10">
              Content for fingerprinting
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setFileData(null);
              }}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              placeholder={isDragging ? "Drop file to generate fingerprint" : "Paste your content here — or drop a file"}
              rows={8}
              className={`w-full px-5 py-5 bg-white border-2 rounded-2xl outline-none transition-all font-mono text-sm placeholder:text-slate-400 shadow-sm resize-none ${
                isDragging ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-100 focus:border-indigo-500'
              }`}
            />
            
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"
              title="Upload file"
            >
              <i className="fas fa-paperclip text-lg"></i>
            </button>

            {isTyping && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md animate-pulse pointer-events-none">
                <i className="fas fa-circle-notch animate-spin"></i>
                PREPARING FINGERPRINT
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={(e) => e.target.files?.[0] && handleFileRead(e.target.files[0])}
            />
          </div>
          
          <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center">
            Supports PDF, DOCX, images, and audio
          </p>

          <button
            onClick={handleGenerate}
            disabled={(!content.trim() && !fileData) || isProcessing}
            className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
              (!content.trim() && !fileData) || isProcessing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-slate-900 text-white hover:bg-black active:scale-[0.99] shadow-slate-200'
            }`}
          >
            {isProcessing ? (
              <><i className="fas fa-cog animate-spin"></i> Finalizing Proof...</>
            ) : (
              <><i className="fas fa-bolt"></i> Generate Proof of Creation</>
            )}
          </button>
        </section>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-12">
          {lastResult ? (
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="fas fa-fingerprint text-9xl"></i>
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">
                    Live Proof
                  </div>
                  <i className="fas fa-certificate text-indigo-400 text-2xl"></i>
                </div>

                <div>
                  <h3 className="text-2xl font-bold truncate mb-1">{lastResult.label}</h3>
                  <p className="text-slate-400 text-sm">{formatTimestamp(new Date(lastResult.timestamp))}</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Cryptographic Fingerprint</span>
                    <p className="font-mono text-xs break-all leading-relaxed text-indigo-200">
                      {lastResult.fingerprint}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed italic">
                  This signature is permanently attached to this specific iteration of your work.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-[400px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-center p-12 text-slate-400">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-sparkles text-2xl"></i>
              </div>
              <h3 className="font-bold text-slate-600 mb-2 text-lg">Your proof will appear here</h3>
              <p className="text-sm">Once generated, your digital fingerprint becomes a verifiable asset in your vault.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProof;
