import { useState } from 'react';
import { Currency, NavTab, TradeEntry } from './types';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import JournalPage from './pages/JournalPage';
import LogEntryPage from './pages/LogEntryPage';
import HistoryPage from './pages/HistoryPage';

const INITIAL_BALANCE_KRW = 2000000;

export default function App() {
  const [currency, setCurrency] = useState<Currency>('KRW');
  const [activeTab, setActiveTab] = useState<NavTab>('journal');
  const [entries, setEntries] = useState<TradeEntry[]>([]);

  const handleToggleCurrency = (c: Currency) => setCurrency(c);

  const handleSaveEntry = (entry: Omit<TradeEntry, 'id'>) => {
    const newEntry: TradeEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date(entry.date).toLocaleString('ko-KR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setEntries(prev => [...prev, newEntry]);
    setActiveTab('journal');
  };

  const pnl = entries.reduce((acc, e) => {
    const total = e.price * e.quantity;
    return acc + (e.type === 'SELL' ? total : -total);
  }, 0);

  const balanceKrw = INITIAL_BALANCE_KRW + pnl;

  return (
    <div className="min-h-screen font-body-md text-body-md pb-24">
      <TopBar
        currency={currency}
        balance={balanceKrw}
        onToggleCurrency={handleToggleCurrency}
      />

      <main className="px-4 mt-6 space-y-6">
        {activeTab === 'journal' && (
          <JournalPage currency={currency} entries={entries} />
        )}
        {activeTab === 'logEntry' && (
          <LogEntryPage currency={currency} onSave={handleSaveEntry} />
        )}
        {activeTab === 'history' && (
          <HistoryPage currency={currency} entries={entries} />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
