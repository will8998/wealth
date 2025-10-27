import { Balance, Position, Transaction, Yield } from "./types";

const today = new Date();

function daysAgo(n: number) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

// Income: 20,000 USDC per month (inflow spread into two entries mid and end month)
export const transactions: Transaction[] = [
  { id: "t1", date: daysAgo(2), amount: 10000, type: "in", category: "income", source: "USDC" },
  { id: "t2", date: daysAgo(16), amount: 10000, type: "in", category: "income", source: "USDC" },
  // Expenses TBC (left empty for now)
];

// Positions optional for net worth; leaving minimal for MVP
export const positions: Position[] = [];

// Market making: 42,000 USD deployed
export const yields: Yield[] = [
  { id: "y1", venue: "MM Venue", strategy: "USDC pool", deployed: 42000, apy_est: 0.12, pnl_mtd: 0 },
];

// Savings fiat: 10,000 USD
export const balances: Balance[] = [
  { id: "b1", account: "Bank", currency: "USD", amount: 10000, liquidity_bucket: "T0" },
];


