import { useState } from 'react';
import { Currency } from '../types';

const MOCK_RATE = 1400;

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('KRW');

  const toggle = () => setCurrency(prev => prev === 'KRW' ? 'USD' : 'KRW');

  const format = (krwAmount: number) => {
    if (currency === 'KRW') {
      return `₩ ${krwAmount.toLocaleString()}`;
    }
    const usd = Math.round(krwAmount / MOCK_RATE);
    return `$ ${usd.toLocaleString()}`;
  };

  const formatLarge = (krwAmount: number) => {
    if (currency === 'KRW') {
      return krwAmount.toLocaleString();
    }
    return Math.round(krwAmount / MOCK_RATE).toLocaleString();
  };

  return { currency, toggle, setCurrency, format, formatLarge };
}
