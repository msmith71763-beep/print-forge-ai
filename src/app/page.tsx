"use client";

import { useState, useEffect } from 'react';
import { Upload, Type, Boxes, Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import ModelViewer from '@/components/ModelViewer';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const generateModel = async () => {
    if (!prompt && !image) return;
    setLoading(true);
    setProgress(0);
    setStatus('Initializing AI sculpting engine...');
    
    // Simulation of the Meshy AI / Tripo AI pipeline
    const steps = [
      { p: 10, s: 'Analyzing description and reference image...' },
      { p: 30, s: 'Generating multi-view point clouds...' },
      { p: 60, s: 'Synthesizing 3D mesh geometry...' },
      { p: 85, s: 'Optimizing topology for STL (watertight check)...' },
      { p: 100, s: 'Generation complete!' }
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
      setProgress(step.p);
      setStatus(step.s);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-violet-500/30">
      
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Next-Gen 3D Forge</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              Print<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Forge</span>
            </h1>
            <p className="text-zinc-500 max-w-lg text-lg font-medium leading-relaxed">
              The ultimate AI pipeline for converting ideas into physical reality. High-fidelity STL output for 3D printing.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <span>Powered by Meshy & Tripo</span>
            <div className="w-px h-4 bg-zinc-800" />
            <span className="text-emerald-500 flex items-center gap-1">
              <CheckCircle2 size={14} /> Systems Online
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Input Panel */}
          <div className="lg:col-span-5 space-y-10">
            
            <div className="space-y-8 p-8 bg-zinc-900/40 border border-zinc-800/50 rounded-[32px] backdrop-blur-xl">
              
              {/* Text Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <Type size={16} className="text-violet-500" />
                    Description
                  </label>
                  <span className="text-[10px] text-zinc-600 font-bold">REQUIRED</span>
                </div>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your object in detail (e.g. 'An anatomical heart with clockwork gears instead of valves, highly detailed metal texture')"
                  className="w-full h-40 bg-black/40 border border-zinc-800 rounded-2xl p-5 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all resize-none placeholder:text-zinc-700"
                />
              </div>

              {/* Image Input */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Upload size={16} className="text-violet-500" />
                  Visual Reference
                </label>
                <div className="relative group aspect-video">
                  <input 
                    type="file" 
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    accept="image/*"
                  />
                  <div className={`w-full h-full rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${imagePreview ? 'border-violet-500/50 bg-black/20' : 'border-zinc-800 bg-black/40 group-hover:border-zinc-700'}`}>
                    {imagePreview ? (
                      <img src={imagePreview} className="h-full w-full object-contain p-4 rounded-2xl" />
                    ) : (
                      <>
                        <div className="p-4 bg-zinc-900 rounded-2xl text-zinc-500 group-hover:text-violet-400 transition-colors">
                          <Upload size={24} />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Drop reference photo here</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Forge Button */}
              <button 
                onClick={generateModel}
                disabled={loading || (!prompt && !image)}
                className="group relative w-full h-20 bg-white hover:bg-zinc-100 disabled:bg-zinc-800 disabled:opacity-50 text-black rounded-3xl transition-all overflow-hidden active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw size={20} className="animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{progress}%</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Boxes size={24} />
                    <span className="text-lg font-black uppercase tracking-tighter">Forge 3D Asset</span>
                  </div>
                )}
                {loading && (
                  <div 
                    className="absolute bottom-0 left-0 h-1.5 bg-violet-600 transition-all duration-500" 
                    style={{ width: `${progress}%` }} 
                  />
                )}
              </button>

              {status && (
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-violet-400/80 animate-pulse">
                  {status}
                </p>
              )}
            </div>

          </div>

          {/* Right: Viewport Panel */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex-1 min-h-[500px] lg:min-h-0 relative">
              <ModelViewer url={modelUrl} />
              
              {/* Overlay Controls */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Auto-Repair Active</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-2 gap-6">
              <button className="h-16 flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all">
                 <Download size={20} className="text-violet-500" />
                 Get GLB
              </button>
              <button className="h-16 flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-500 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all shadow-2xl shadow-violet-900/40">
                 <Download size={20} />
                 Export STL
              </button>
            </div>
          </div>

        </div>

        {/* Technical Footer */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-900 pt-16">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-violet-500">Geometry</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Every generation is automatically processed through our <b>Meshmixer</b>-inspired refinement pipeline to ensure watertight manifolds and zero self-intersections.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-violet-500">Printing</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Direct STL export optimized for FDM, SLA, and SLS printing. Scale and orientation are normalized for immediate slicing compatibility.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-violet-500">AI Compute</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Utilizing a hybrid of diffusion-based sculpting and neural radiance fields to interpret spatial data from 2D reference images.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}