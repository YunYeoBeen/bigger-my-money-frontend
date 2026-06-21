import { useEffect, useRef, useState } from 'react';

export default function MarketInsights() {
  const [btcPrice, setBtcPrice] = useState(94281);
  const [flashing, setFlashing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setBtcPrice(prev => {
        const change = (Math.random() - 0.5) * 50;
        return Math.round(prev + change);
      });
      setFlashing(true);
      setTimeout(() => setFlashing(false), 800);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="grid grid-cols-2 gap-4">
      {/* BTC Price */}
      <div className="glass-card rounded-xl p-4 flex flex-col gap-1 border-l-4 border-primary">
        <p className="text-label-mono-sm text-on-surface-variant">BITCOIN</p>
        <div className={`transition-colors duration-500 rounded p-1 ${flashing ? 'price-flash-up' : ''}`}>
          <h3 className="text-headline-md text-on-surface tracking-tight">
            ${btcPrice.toLocaleString()}
          </h3>
        </div>
        <p className="text-[12px] text-[#22C55E]">+2.1% (24h)</p>
      </div>

      {/* Fear & Greed */}
      <div className="glass-card rounded-xl p-4 flex flex-col gap-1">
        <p className="text-label-mono-sm text-on-surface-variant uppercase">Market Sentiment</p>
        <div className="flex items-center gap-3 mt-1">
          <div className="w-10 h-10 rounded-full border-2 border-tertiary-container flex items-center justify-center">
            <span className="text-label-mono-lg text-tertiary">78</span>
          </div>
          <span className="text-label-mono-md text-tertiary uppercase">Greed</span>
        </div>
      </div>
    </section>
  );
}
