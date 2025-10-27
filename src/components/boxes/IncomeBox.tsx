"use client";

import GlassCard from "../../components/GlassCard";
import { transactions } from "../../lib/dummyData";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "../../lib/utils";

function lastNDays(n: number) {
  const data: { day: string; value: number }[] = [];
  for (let i = n; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayKey = d.toISOString().slice(0, 10);
    const value = transactions
      .filter((t) => t.type === "in" && t.date.startsWith(dayKey))
      .reduce((a, t) => a + t.amount, 0);
    data.push({ day: dayKey.slice(5), value });
  }
  return data;
}

export default function IncomeBox() {
  const income30 = transactions.filter((t) => t.type === "in").reduce((a, t) => a + t.amount, 0);
  const prev = income30 * 0.85;
  const growth = prev > 0 ? (income30 - prev) / prev : 0;
  const series = lastNDays(30);
  const nextInflowDays = 5;

  return (
    <GlassCard className="accent-glow-cyan">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-400">Income (30d)</div>
          <div className="text-2xl font-semibold">{formatCurrency(income30)}</div>
          <div className="text-xs mt-1 text-neon-cyan">{(growth * 100).toFixed(1)}% vs prev</div>
        </div>
        <div className="text-xs text-zinc-400">Next inflow in {nextInflowDays}d</div>
      </div>
      <div className="h-24 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <Tooltip contentStyle={{ background: "rgba(15,18,28,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#e6e9ef" }} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
            <Line type="monotone" dataKey="value" stroke="#00e5ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}


