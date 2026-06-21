import { useState } from 'react';
import { TradeType, Currency } from '../types';

interface QuickLogEntryProps {
  currency: Currency;
  onSave: (entry: {
    type: TradeType;
    asset: string;
    price: number;
    quantity: number;
    date: string;
  }) => void;
}

export default function QuickLogEntry({ currency, onSave }: QuickLogEntryProps) {
  const [tradeType, setTradeType] = useState<TradeType>('BUY');
  const [asset, setAsset] = useState('BTC');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const [date, setDate] = useState(now.toISOString().slice(0, 16));

  const isBuy = tradeType === 'BUY';

  const handleSave = () => {
    if (!price || !quantity) return;
    onSave({
      type: tradeType,
      asset: asset.toUpperCase(),
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      date,
    });
    setPrice('');
    setQuantity('');
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-headline-md text-primary">Quick Log Entry</h4>
        <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant">
          <button
            onClick={() => setTradeType('BUY')}
            className={`px-4 py-1 text-label-mono-sm rounded-full transition-all ${
              isBuy ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            BUY
          </button>
          <button
            onClick={() => setTradeType('SELL')}
            className={`px-4 py-1 text-label-mono-sm rounded-full transition-all ${
              !isBuy ? 'bg-error text-on-error' : 'text-on-surface-variant'
            }`}
          >
            SELL
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-label-mono-sm text-on-surface-variant ml-1">Asset</label>
            <div className="relative">
              <input
                type="text"
                value={asset}
                onChange={e => setAsset(e.target.value)}
                placeholder="BTC"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">
                search
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-label-mono-sm text-on-surface-variant ml-1">Log Date</label>
            <input
              type="datetime-local"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-label-mono-sm text-on-surface-variant ml-1">
              Price ({currency})
            </label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="130,240,000"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface"
            />
          </div>

          <div className="space-y-1">
            <label className="text-label-mono-sm text-on-surface-variant ml-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="0.002"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
            className={`w-full font-headline-sm py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-100 flex items-center justify-center gap-2 ${
              isBuy
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            {isBuy ? 'Save Record' : 'Save Sell Entry'}
            <span className="material-symbols-outlined">save</span>
          </button>
        </div>
      </div>
    </section>
  );
}
