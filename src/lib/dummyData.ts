import { Balance, Position, Transaction, Yield } from "./types";

const today = new Date();

function daysAgo(n: number) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const transactions: Transaction[] = [
  { id: "t1", date: daysAgo(2), amount: 5200, type: "in", category: "salary", source: "Acme Inc." },
  { id: "t2", date: daysAgo(10), amount: 380, type: "in", category: "staking", source: "CBETH" },
  { id: "t3", date: daysAgo(15), amount: 1600, type: "in", category: "freelance", source: "Client A" },
  { id: "t4", date: daysAgo(1), amount: -120, type: "out", category: "subscriptions", source: "SaaS" },
  { id: "t5", date: daysAgo(3), amount: -240, type: "out", category: "lifestyle", source: "Dining" },
  { id: "t6", date: daysAgo(5), amount: -980, type: "out", category: "business", source: "Tools" },
  { id: "t7", date: daysAgo(8), amount: -320, type: "out", category: "transport", source: "Car" },
  { id: "t8", date: daysAgo(11), amount: -420, type: "out", category: "rent", source: "Housing" },
  { id: "t9", date: daysAgo(20), amount: -210, type: "out", category: "groceries", source: "Market" },
  { id: "t10", date: daysAgo(22), amount: -160, type: "out", category: "subscriptions", source: "Stream" },
  { id: "t11", date: daysAgo(28), amount: 5100, type: "in", category: "salary", source: "Acme Inc." },
];

export const positions: Position[] = [
  { id: "p1", venue: "Coinbase", asset: "ETH", qty: 12, cost_basis: 24000, mark_price: 26800 },
  { id: "p2", venue: "BrokerA", asset: "AAPL", qty: 80, cost_basis: 13600, mark_price: 15200 },
];

export const yields: Yield[] = [
  { id: "y1", venue: "Uniswap", strategy: "USDC-ETH MM", deployed: 12000, apy_est: 0.18, pnl_mtd: 180 },
  { id: "y2", venue: "VaultX", strategy: "CBTC covered", deployed: 8000, apy_est: 0.12, pnl_mtd: 95 },
];

export const balances: Balance[] = [
  { id: "b1", account: "Chase", currency: "USD", amount: 9200, liquidity_bucket: "T0" },
  { id: "b2", account: "Kraken", currency: "USDC", amount: 6400, liquidity_bucket: "T0" },
  { id: "b3", account: "MoneyMkt", currency: "USD", amount: 18000, liquidity_bucket: "T2" },
  { id: "b4", account: "Treasury", currency: "USD", amount: 32000, liquidity_bucket: "30d" },
];


