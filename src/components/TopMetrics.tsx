"use client";

import { balances, positions, transactions } from "../lib/dummyData";
import { formatCurrency } from "../lib/utils";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

function computeNetWorth() {
  const cash = balances.reduce((a, b) => a + b.amount, 0);
  const equities = positions.reduce((a, p) => a + p.mark_price, 0);
  // simplistic liabilities: none in MVP
  return cash + equities;
}

function sparklineData() {
  return Array.from({ length: 45 }, (_, i) => ({ day: i, value: 80000 + Math.sin(i / 6) * 2000 + i * 120 }));
}

export default function TopMetrics() {
  const netWorth = computeNetWorth();
  const runwayDays = Math.round(
    (balances.reduce((a, b) => a + b.amount, 0) /
      Math.max(1, Math.abs(transactions.filter((t) => t.type === "out").reduce((a, t) => a + t.amount, 0)) / 30))
  );

  return (
    <div className="px-4 sm:px-6 pt-3">
      <div className="glass neon-border rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-400">Net Worth</div>
          <div className="text-xl font-semibold">{formatCurrency(netWorth)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-400">Runway</div>
          <div className="text-xl font-semibold">{Math.round(runwayDays / 30)} mo</div>
        </div>
        <div className="col-span-2 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData()}>
              <Area type="monotone" dataKey="value" stroke="#00e5ff" fill="url(#spark)" strokeWidth={2} />
              <defs>
                <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


