// Shared types used across Dashboard, SpendingSummary, and App
export interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}
