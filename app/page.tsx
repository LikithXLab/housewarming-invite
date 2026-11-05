'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Key, MapPin, Calendar, Phone, Home, Sparkles } from 'lucide-react';

export default function HousewarmingInvite() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [rsvpState, setRsvpState] = useState<'attending' | 'missing' | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Event Date: 22nd November 2026 at 10:00 AM
  const eventDate = new Date('2026-11-22T10:00:00');

  useEffect(() => {
    const sound = new Audio('https://pixabay.com');
    sound.loop = true;
    setAudio(sound);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate.getTime() - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      sound.pause();
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleSound = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleRSVP = (attending: boolean) => {
    setRsvpState(attending ? 'attending' : 'missing');
    if (attending) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <main className="flex justify-center min-h-screen bg-[#f7f3ee]">
      <div className="w-full max-w-md bg-[#faf7f2] min-h-screen shadow-2xl relative overflow-x-hidden pb-12 font-serif text-stone-800">
        
        {/* Audio Toggle */}
        {isOpen && (
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="fixed top-4 right-4 z-50 bg-stone-900/60 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-stone-900 transition"
          >
            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        )}

        {/* 1. Cover Screen */}
        <div
          className={`absolute inset-0 bg-[#f4ebe1] z-40 flex flex-col items-center justify-center p-6 text-center transition-transform duration-1000 ease-in-out ${
            isOpen ? '-translate-y-full pointer-events-none' : 'translate-y-0'
          }`}
        >
          <div className="p-8 border border-amber-300/60 rounded-2xl bg-white/70 backdrop-blur-sm shadow-xl max-w-xs w-full flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-800 font-sans mb-2">You are cordially invited</p>
            <h1 className="text-2xl text-amber-900 mb-1 font-semibold tracking-wide">House Warming Ceremony</h1>
            <p className="text-xs font-sans italic text-stone-600 mb-6">Griha Pravesha</p>
            
            <button
              onClick={handleOpenInvitation}
              className="group flex flex-col items-center gap-3 transition-transform active:scale-95"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
                <Key size={24} className="rotate-45" />
              </div>
              <span className="text-xs font-sans tracking-widest text-amber-900 font-medium uppercase border-b border-amber-500 pb-0.5">
                Open Invitation
              </span>
            </button>
          </div>
        </div>

        {/* 2. Main Invitation Content */}
        <div className="p-6 space-y-7 text-center pt-8">
          
          {/* Header & Blessings */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-amber-900 tracking-wide">
              || Shree Ganeshaya Namaha ||
            </h2>
            <p className="text-xs font-sans text-stone-500 italic">
              May Lord Ganesha bless our home with peace and prosperity
            </p>
            <h3 className="text-lg font-semibold text-stone-800 pt-2">
              A Warm Invitation
            </h3>
            <p className="text-xs font-sans text-stone-600 px-3 leading-relaxed">
              As we step into our new home with gratitude and joy, we warmly invite you and your family to join us to celebrate and bless our new beginning.
            </p>
          </div>

          {/* Centerpiece Banner */}
          <div className="rounded-2xl p-6 shadow-md border border-amber-200 bg-gradient-to-b from-amber-50/60 to-white flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-1 shadow-sm">
              <Home size={32} />
            </div>
            <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-base">
              <Sparkles size={16} className="text-amber-600" />
              <span>Our New Residence</span>
              <Sparkles size={16} className="text-amber-600" />
            </div>
            <p className="text-xs font-sans text-stone-500 tracking-wide uppercase">
              Bengaluru, Karnataka
            </p>
          </div>

          {/* Countdown */}
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200/80 rounded-2xl p-5 shadow-sm">
            <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-amber-800 mb-3">Countdown to Ceremony</p>
            <div className="grid grid-cols-4 gap-2 font-sans">
              <div className="bg-[#f9f5f0] p-2 rounded-lg">
                <span className="text-xl font-bold text-stone-800">{timeLeft.days}</span>
                <span className="block text-[10px] uppercase text-stone-500">Days</span>
              </div>
              <div className="bg-[#f9f5f0] p-2 rounded-lg">
                <span className="text-xl font-bold text-stone-800">{timeLeft.hours}</span>
                <span className="block text-[10px] uppercase text-stone-500">Hours</span>
              </div>
              <div className="bg-[#f9f5f0] p-2 rounded-lg">
                <span className="text-xl font-bold text-stone-800">{timeLeft.mins}</span>
                <span className="block text-[10px] uppercase text-stone-500">Mins</span>
              </div>
              <div className="bg-[#f9f5f0] p-2 rounded-lg">
                <span className="text-xl font-bold text-stone-800">{timeLeft.secs}</span>
                <span className="block text-[10px] uppercase text-stone-500">Secs</span>
              </div>
            </div>
          </div>

          {/* Venue & Timing */}
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200/80 rounded-2xl p-5 shadow-sm space-y-3 font-sans">
            <h3 className="font-serif text-lg text-amber-900">Venue & Date</h3>
            
            <div className="flex items-center justify-center gap-2 text-stone-700 text-sm">
              <Calendar size={16} className="text-amber-700 shrink-0" />
              <span>Sunday, 22 November 2026 • 10:00 AM</span>
            </div>

            <div className="flex items-start justify-center gap-2 text-stone-700 text-sm text-center px-2">
              <MapPin size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <span>Kempapura, Kumbarahalli Main Rd, Opp Sampadha Gas Godown, Chikkabanavara, Kempapura, Karnataka 560090</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-stone-700 text-sm pt-1">
              <Phone size={16} className="text-amber-700 shrink-0" />
              <a href="tel:+91000000000" className="font-semibold text-amber-900 underline underline-offset-4">
                +91 00000 0000
              </a>
            </div>

            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs bg-stone-900 text-amber-100 px-5 py-2.5 rounded-full font-medium tracking-wide shadow-sm hover:bg-stone-800 transition"
            >
              Open in Google Maps
            </a>
          </div>

          {/* RSVP */}
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200/80 rounded-2xl p-6 shadow-sm font-sans space-y-4">
            <h4 className="font-serif text-base text-amber-900">Will You Celebrate With Us?</h4>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleRSVP(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
                  rsvpState === 'attending'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                I'll Be There
              </button>
              <button
                onClick={() => handleRSVP(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border transition ${
                  rsvpState === 'missing'
                    ? 'bg-stone-200 text-stone-800 border-stone-400'
