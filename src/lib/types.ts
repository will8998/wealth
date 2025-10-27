export type Transaction = {
  id: string;
  date: string; // ISO
  amount: number; // positive for income, negative for expense
  type: "in" | "out";
  category: string; // e.g., salary, lifestyle, business
  source: string; // e.g., employer, staking, freelance
};

export type Position = {
  id: string;
  venue: string;
  asset: string;
  qty: number;
  cost_basis: number; // USD total
  mark_price: number; // USD total
};

export type Yield = {
  id: string;
  venue: string;
  strategy: string;
  deployed: number; // USD
  apy_est: number; // decimal, e.g. 0.12
  pnl_mtd: number; // USD
};

export type Balance = {
  id: string;
  account: string;
  currency: string;
  amount: number; // USD
  liquidity_bucket: "T0" | "T2" | "30d";
};


