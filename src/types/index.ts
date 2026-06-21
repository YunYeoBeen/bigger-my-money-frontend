export type Currency = 'KRW' | 'USD';
export type TradeType = 'BUY' | 'SELL';
export type NavTab = 'journal' | 'logEntry' | 'history';

export interface TradeEntry {
  id: string;
  type: TradeType;
  asset: string;
  quantity: number;
  price: number;
  currency: Currency;
  date: string;
}
