'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [status, setStatus] = useState<string>('Connecting to Supabase...');
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('profiles').select('*');

      if (error) {
        setStatus(`Connection Error: ${error.message}`);
        setIsConnected(false);
      } else {
        setStatus(`Connected to Supabase! Profiles retrieved: ${data.length}`);
        setIsConnected(true);
      }
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-slate-950 text-white select-none">
      <header className="w-full max-w-4xl py-3 px-4 mb-4 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
        <span className="font-bold text-slate-300">MMORPG Web Portal</span>
        <span className={isConnected ? 'text-emerald-400' : 'text-rose-400'}>
          {status}
        </span>
      </header>

      {/* Embedded Godot WebGL Canvas */}
      <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative">
        <iframe
          src="/game/index.html"
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; focus-without-user-activation"
        />
      </div>
    </main>
  );
}