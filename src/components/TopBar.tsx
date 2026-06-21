import { Currency } from '../types';

interface TopBarProps {
  currency: Currency;
  balance: number;
  onToggleCurrency: (c: Currency) => void;
}

export default function TopBar({ currency, balance, onToggleCurrency }: TopBarProps) {
  const displayBalance = currency === 'KRW'
    ? `₩ ${balance.toLocaleString()}`
    : `$ ${Math.round(balance / 1400).toLocaleString()}`;

  return (
    <header className="flex items-center justify-between px-4 w-full sticky top-0 z-50 h-16 bg-surface border-b border-outline-variant">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          monitoring
        </span>
        <h1 className="text-headline-sm font-bold text-primary tracking-tight">PRO-TRADER JOURNAL</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Currency Toggle */}
        <div className="flex bg-surface-container-high rounded-full p-1 border border-outline-variant cursor-pointer">
          <button
            onClick={() => onToggleCurrency('KRW')}
            className={`px-3 py-1 text-label-mono-sm rounded-full transition-colors duration-200 ${
              currency === 'KRW'
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant'
            }`}
          >
            KRW
          </button>
          <button
            onClick={() => onToggleCurrency('USD')}
            className={`px-3 py-1 text-label-mono-sm rounded-full transition-colors duration-200 ${
              currency === 'USD'
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant'
            }`}
          >
            USD
          </button>
        </div>

        {/* Balance chip */}
        <div className="flex items-center gap-1 bg-surface-container-high px-3 py-1.5 rounded-full border border-outline-variant ml-2">
          <span className="material-symbols-outlined text-secondary text-[18px]">account_balance_wallet</span>
          <span className="text-label-mono-sm text-on-surface">{displayBalance}</span>
        </div>
      </div>
    </header>
  );
}
