"use client";

import { AlertTriangle, PiggyBank, TrendingDown } from "lucide-react";
import { balances, transactions, yields } from "../lib/dummyData";
import { formatCurrency } from "../lib/utils";

function computeBurnRate() {
  const out = transactions.filter((t) => t.type === "out");
  const totalOut = out.reduce((a, t) => a + Math.abs(t.amount), 0);
  const days = 30;
  return totalOut / days;
}

function computeRunway() {
  const savings = balances.reduce((a, b) => a + b.amount, 0);
  const burn = computeBurnRate();
  return burn > 0 ? Math.round(savings / burn / 30) : 0; // months
}

export default function RightRail() {
  const runway = computeRunway();
  const totalDeployed = yields.reduce((a, y) => a + y.deployed, 0);
  const t0Cash = balances.filter((b) => b.liquidity_bucket === "T0").reduce((a, b) => a + b.amount, 0);
  const avgApy = yields.length ? yields.reduce((a, y) => a + y.apy_est, 0) / yields.length : 0;
  const todayOut = transactions
    .filter((t) => t.type === "out" && t.date.startsWith(new Date().toISOString().slice(0, 10)))
    .reduce((a, t) => a + Math.abs(t.amount), 0);
  const avgDailyOut =
    transactions.filter((t) => t.type === "out").reduce((a, t) => a + Math.abs(t.amount), 0) / 30;

  const alerts = [
    runway < 6 && {
      icon: <AlertTriangle size={14} className="text-neon-amber" />,
      title: "Runway low",
      detail: `${runway} months`,
    },
    t0Cash > 10000 && {
      icon: <PiggyBank size={14} className="text-neon-cyan" />,
      title: "Unallocated cash",
      detail: `> ${formatCurrency(10000)}`,
    },
    avgApy < 0.1 && {
      icon: <TrendingDown size={14} className="text-neon-violet" />,
      title: "APY drop",
      detail: `${Math.round(avgApy * 100)}% avg`,
    },
    todayOut > avgDailyOut * 1.2 && {
      icon: <AlertTriangle size={14} className="text-neon-amber" />,
      title: "Expense spike",
      detail: "+20% vs 30d avg",
    },
  ].filter(Boolean) as { icon: JSX.Element; title: string; detail: string }[];

  return (
    <aside className="w-full sm:w-72 lg:w-80 px-4 sm:px-0 sm:pr-4 py-4 space-y-3">
      <h3 className="text-xs uppercase tracking-widest text-zinc-400 px-2">Alerts</h3>
      {alerts.length === 0 && (
        <div className="glass p-3 rounded-lg text-sm">All systems normal.</div>
      )}
      {alerts.map((a, i) => (
        <div key={i} className="glass p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            {a.icon}
            <span className="text-sm">{a.title}</span>
          </div>
          <span className="text-xs text-zinc-400">{a.detail}</span>
        </div>
      ))}

      {null}
    </aside>
  );
}


