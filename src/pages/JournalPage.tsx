import { Currency, TradeEntry } from '../types';
import HeroSection from '../components/HeroSection';
import MarketInsights from '../components/MarketInsights';
import EntryHistory from '../components/EntryHistory';

interface JournalPageProps {
  currency: Currency;
  entries: TradeEntry[];
}

const INITIAL_BALANCE = 2000000;

function calcStats(entries: TradeEntry[]) {
  let pnl = 0;
  entries.forEach(e => {
    const total = e.price * e.quantity;
    pnl += e.type === 'SELL' ? total : -total;
  });
  const roi = INITIAL_BALANCE > 0 ? (pnl / INITIAL_BALANCE) * 100 : 0;
  return { pnl, roi };
}

export default function JournalPage({ currency, entries }: JournalPageProps) {
  const { pnl, roi } = calcStats(entries);

  return (
    <div className="space-y-6">
      <HeroSection
        currency={currency}
        balanceKrw={INITIAL_BALANCE + pnl}
        pnlKrw={pnl}
        roiPercent={roi}
      />
      <MarketInsights />
      <EntryHistory entries={entries} currency={currency} />
    </div>
  );
}
