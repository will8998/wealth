"use client";

import GlassCard from "../../components/GlassCard";
import { balances, transactions } from "../../lib/dummyData";
import { formatCurrency } from "../../lib/utils";

function computeBuckets() {
  const buckets: Record<string, number> = { T0: 0, T2: 0, "30d": 0 };
  for (const b of balances) buckets[b.liquidity_bucket] += b.amount;
  const total = Object.values(buckets).reduce((a, b) => a + b, 0);
  return { buckets, total };
}

function computeRunway() {
  const totalSavings = balances.reduce((a, b) => a + b.amount, 0);
  const monthlyBurn = Math.abs(
    transactions.filter((t) => t.type === "out").reduce((a, t) => a + t.amount, 0)
  );
  return monthlyBurn > 0 ? totalSavings / monthlyBurn : 0;
}

export default function SavingsBox() {
  const { buckets, total } = computeBuckets();
  const runwayMonths = computeRunway();
  const liquidityPct = total ? buckets["T0"] / total : 0;

  return (
    <GlassCard className="accent-glow-amber">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-400">Savings (Fiat / Stable)</div>
          <div className="text-2xl font-semibold">{formatCurrency(total)}</div>
          <div className="text-xs mt-1 text-zinc-400">Runway {runwayMonths.toFixed(1)} mo</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-300/80" style={{ width: `${Math.round(liquidityPct * 100)}%` }} />
          </div>
          <span className="text-xs text-neon-amber">{Math.round(liquidityPct * 100)}% T0</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {(["T0", "T2", "30d"] as const).map((k) => (
          <div key={k} className="glass p-3 rounded-md text-center">
            <div className="text-xs text-zinc-400">{k}</div>
            <div className="font-medium">{formatCurrency(buckets[k])}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}


