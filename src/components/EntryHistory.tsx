import { TradeEntry, Currency } from '../types';

interface EntryHistoryProps {
  entries: TradeEntry[];
  currency: Currency;
}

const MOCK_ENTRIES: TradeEntry[] = [
  {
    id: '1',
    type: 'BUY',
    asset: 'BTC',
    quantity: 0.045,
    price: 130000000,
    currency: 'KRW',
    date: 'Today, 14:20',
  },
  {
    id: '2',
    type: 'SELL',
    asset: 'ETH',
    quantity: 1.2,
    price: 3433333,
    currency: 'KRW',
    date: 'Yesterday',
  },
  {
    id: '3',
    type: 'BUY',
    asset: 'SOL',
    quantity: 150,
    price: 216667,
    currency: 'KRW',
    date: 'Oct 24, 09:12',
  },
];

function formatAmount(entry: TradeEntry, currency: Currency) {
  const totalKrw = entry.price * entry.quantity;
  const amount = currency === 'KRW' ? totalKrw : Math.round(totalKrw / 1400);
  const symbol = currency === 'KRW' ? '₩' : '$';
  const sign = entry.type === 'BUY' ? '-' : '+';
  return `${sign}${symbol} ${amount.toLocaleString()}`;
}

export default function EntryHistory({ entries, currency }: EntryHistoryProps) {
  const displayEntries = entries.length > 0 ? entries : MOCK_ENTRIES;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-headline-md text-on-surface">Entry History</h4>
        <span className="text-label-mono-sm text-primary cursor-pointer hover:opacity-80">View All</span>
      </div>

      <div className="space-y-2">
        {displayEntries.map(entry => {
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
                    Logged {isBuy ? 'Buy' : 'Sell'}: {entry.quantity} {entry.asset}
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
