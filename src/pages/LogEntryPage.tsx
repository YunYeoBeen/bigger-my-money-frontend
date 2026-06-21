import { Currency, TradeEntry } from '../types';
import QuickLogEntry from '../components/QuickLogEntry';

interface LogEntryPageProps {
  currency: Currency;
  onSave: (entry: Omit<TradeEntry, 'id'>) => void;
}

export default function LogEntryPage({ currency, onSave }: LogEntryPageProps) {
  return (
    <div className="space-y-6">
      <QuickLogEntry
        currency={currency}
        onSave={entry =>
          onSave({ ...entry, currency })
        }
      />
    </div>
  );
}
