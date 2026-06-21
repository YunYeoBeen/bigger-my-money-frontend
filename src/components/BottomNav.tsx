import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const NAV_ITEMS: { tab: NavTab; icon: string; label: string }[] = [
  { tab: 'journal', icon: 'dashboard', label: 'Journal' },
  { tab: 'logEntry', icon: 'edit_note', label: 'Log Entry' },
  { tab: 'history', icon: 'history', label: 'History' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface-container-low border-t border-outline-variant">
      {NAV_ITEMS.map(({ tab, icon, label }) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex flex-col items-center justify-center rounded-full px-6 py-1 active:scale-90 transition-transform duration-200 ${
              isActive
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {icon}
            </span>
            <span className="text-label-mono-sm">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
