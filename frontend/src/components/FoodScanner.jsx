import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, RefreshCw, Loader2, ArrowLeft, CheckCircle2, Zap, Target, Droplets, AlertCircle, Scale } from 'lucide-react';
import { useApp } from '../AppContext';

const FoodScanner = () => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(""); // Added Error State
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const navigate = useNavigate();
  const { addEntry } = useApp();

  const startCamera = async () => {
    setIsCameraActive(true);
    setResult(null);
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCameraActive(false);
      alert("Could not access camera. Please try uploading a file instead.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  // Optimized Capture: Resizes image to max 1024px to prevent timeouts
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        const MAX_WIDTH = 1024;
        
        let width = videoWidth;
        let height = videoHeight;

        // Resize logic
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        context.drawImage(videoRef.current, 0, 0, width, height);
        
        // Compress to 0.7 quality
        const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.7);
        
        setImage(dataUrl);
        stopCamera();
        analyzeImage(dataUrl);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImage(base64);
        analyzeImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- REAL BACKEND CONNECTION ---
  const analyzeImage = async (base64Data) => {
    setIsAnalyzing(true);
    setResult(null);
    setError("");

    try {
      // 1. Send to your Backend
      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Data }),
      });

      if (!res.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.error("Analysis Error:", err);
      setError("Could not analyze this food. Please try a clearer photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLog = () => {
    if (result) {
      const foodItem = {
        id: 'scanned-' + Date.now(),
        name: result.foodName,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        // We can save the extra data in the description or extend the object
        description: `Scanned: ${result.portionSize}`, 
        image: image || '',
      };
      
      addEntry(foodItem, 'lunch'); // Logs to lunch by default
      navigate('/food-diary');
    }
  };

  const handleReset = () => {
      setImage(null);
      setResult(null);
      setError("");
      setIsCameraActive(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-slate-800">AI Food Scanner</h1>
        <div className="w-10 h-10" />
      </div>

      {/* Camera / Preview Area */}
      <div className="relative aspect-[4/3] bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl group border-4 border-slate-900">
        
        {/* State 1: Idle */}
        {!image && !isCameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-6 bg-slate-800">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse ring-4 ring-emerald-500/10">
              <Camera size={40} className="text-emerald-400" />
            </div>
            <div className="text-center space-y-2 px-4">
              <h3 className="text-xl font-bold">Ready to Scan?</h3>
              <p className="text-slate-400 text-sm max-w-[200px] mx-auto">Point your camera at your meal for instant nutrient breakdown.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={startCamera} className="bg-emerald-600 px-6 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2">
                <Camera size={20} /> Open Camera
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="bg-white/10 px-6 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10">
                <Upload size={20} /> Upload
              </button>
            </div>
          </div>
        )}

        {/* State 2: Camera Active */}
        {isCameraActive && (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-8">
               <button onClick={stopCamera} className="p-4 bg-white/20 backdrop-blur-xl text-white rounded-full">
                 <RefreshCw size={24} />
               </button>
               <button onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full border-4 border-emerald-500/30 flex items-center justify-center hover:scale-105 transition-transform" />
            </div>
          </>
        )}

        {/* State 3: Image Captured & Analyzing */}
        {image && (
          <div className="relative w-full h-full">
            <img src={image} className="w-full h-full object-cover" alt="Food preview" />
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center z-20">
                <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
                <h3 className="text-2xl font-black mb-2">Analyzing Food...</h3>
                <p className="text-slate-300">Sending to AI...</p>
              </div>
            )}

            {/* Error Overlay */}
            {error && (
               <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center z-20">
                 <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
                 <p className="text-slate-300 mb-6">{error}</p>
                 <button onClick={handleReset} className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                   Try Again
                 </button>
               </div>
            )}

            {!isAnalyzing && !error && (
               <button onClick={handleReset} className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md text-white rounded-full z-10 hover:bg-black/70 transition-all">
                 <RefreshCw size={20} />
               </button>
            )}
          </div>
        )}
      </div>

      {/* Result Card */}
      {result && !isAnalyzing && (
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-10">
          <div className="flex items-center justify-between border-b border-slate-50 pb-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 leading-tight">{result.foodName}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-1">
                     <Scale size={10} /> {result.portionSize}
                   </span>
                </div>
              </div>
            </div>
            <div className="text-right whitespace-nowrap pl-2">
               <span className="text-4xl font-black text-emerald-600">{result.calories}</span>
               <span className="text-xs font-bold text-slate-400 uppercase ml-1 block">kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <div className="text-2xl font-black text-slate-800">{result.protein}g</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                 <Target size={10} className="text-blue-500" /> Protein
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <div className="text-2xl font-black text-slate-800">{result.carbs}g</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                 <Zap size={10} className="text-emerald-500" /> Carbs
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <div className="text-2xl font-black text-slate-800">{result.fat}g</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                 <Droplets size={10} className="text-rose-500" /> Fat
              </div>
            </div>
          </div>
            
          {/* Fiber & Sugar Mini details */}
          <div className="flex justify-center gap-8 text-xs text-slate-400 font-bold uppercase tracking-widest">
                <span>Fiber: {result.fiber}g</span>
                <span>Sugar: {result.sugar}g</span>
          </div>

          <button onClick={handleLog} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all active:scale-95">
            Log This Meal
          </button>
        </div>
      )}

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default FoodScanner;