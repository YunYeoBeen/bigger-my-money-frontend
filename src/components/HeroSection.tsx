import { Currency } from '../types';

interface HeroSectionProps {
  currency: Currency;
  balanceKrw: number;
  pnlKrw: number;
  roiPercent: number;
}

export default function HeroSection({ currency, balanceKrw, pnlKrw, roiPercent }: HeroSectionProps) {
  const isPositive = pnlKrw >= 0;

  const displayBalance = currency === 'KRW'
    ? balanceKrw.toLocaleString()
    : Math.round(balanceKrw / 1400).toLocaleString();

  const displayPnl = currency === 'KRW'
    ? `${isPositive ? '+' : ''}₩ ${Math.abs(pnlKrw).toLocaleString()} PnL`
    : `${isPositive ? '+' : ''}$ ${Math.abs(Math.round(pnlKrw / 1400)).toLocaleString()} PnL`;

  return (
    <section className="glass-card rounded-xl p-6 relative overflow-hidden">
      <div className="relative z-10 flex flex-col gap-1">
        <p className="text-label-mono-sm text-on-surface-variant opacity-70 uppercase tracking-widest">
          Total Logged Balance
        </p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-display-lg text-primary tracking-tight">{displayBalance}</h2>
          <span className="text-headline-sm text-primary-fixed-dim">{currency}</span>
        </div>
        <div className="flex items-center gap-6 mt-2">
          <div className={`flex items-center gap-1 ${isPositive ? 'text-[#22C55E]' : 'text-error'}`}>
            <span className="material-symbols-outlined text-[18px]">
              {isPositive ? 'trending_up' : 'trending_down'}
            </span>
            <span className="text-label-mono-md">{isPositive ? '+' : ''}{roiPercent.toFixed(1)}% ROI</span>
          </div>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-[#22C55E]' : 'text-error'}`}>
            <span className="text-label-mono-md">{displayPnl}</span>
          </div>
        </div>
      </div>

      {/* PnL Chart Background */}
      <div className="absolute bottom-0 left-0 w-full h-32 chart-placeholder flex items-end">
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <path
            d="M0,80 Q50,90 100,60 T200,40 T300,20 T400,10 L400,100 L0,100 Z"
            fill="url(#pnl-grad)"
          />
          <path
            d="M0,80 Q50,90 100,60 T200,40 T300,20 T400,10"
            fill="none"
            stroke="#adc6ff"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="pnl-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#adc6ff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
