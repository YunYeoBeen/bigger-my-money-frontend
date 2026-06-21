import { Currency, TradeEntry } from '../types';

interface HistoryPageProps {
  currency: Currency;
  entries: TradeEntry[];
}

function formatAmount(entry: TradeEntry, currency: Currency) {
  const totalKrw = entry.price * entry.quantity;
  const amount = currency === 'KRW' ? totalKrw : Math.round(totalKrw / 1400);
  const symbol = currency === 'KRW' ? '₩' : '$';
  const sign = entry.type === 'BUY' ? '-' : '+';
  return `${sign}${symbol} ${amount.toLocaleString()}`;
}

export default function HistoryPage({ currency, entries }: HistoryPageProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl opacity-30">history</span>
        <p className="text-label-mono-md opacity-50">No entries yet. Start logging trades!</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h4 className="text-headline-md text-on-surface">Full History</h4>
      <div className="space-y-2">
        {[...entries].reverse().map(entry => {
          const isBuy = entry.type === 'BUY';
          const amountText = formatAmount(entry, currency);
          const isPositive = amountText.startsWith('+');

          return (
            <div
              key={entry.id}
              className="glass-card rounded-lg p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isBuy ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-error/10 text-error'
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isBuy ? 'add_circle' : 'do_not_disturb_on'}
                  </span>
                </div>
                <div>
                  <p className="text-label-mono-md text-on-surface">
                    {entry.asset} / {currency}
                  </p>
                  <p className="text-[12px] text-on-surface-variant">
                    {isBuy ? 'Buy' : 'Sell'}: {entry.quantity} {entry.asset}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-label-mono-md ${isPositive ? 'text-[#22C55E]' : 'text-on-surface'}`}>
                  {amountText}
                </p>
                <p className="text-[12px] text-on-surface-variant">{entry.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
