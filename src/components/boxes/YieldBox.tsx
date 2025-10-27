"use client";

import GlassCard from "../../components/GlassCard";
import { yields } from "../../lib/dummyData";
import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { formatCurrency, formatPercent } from "../../lib/utils";

function profitHistory() {
  // simple synthetic series
  const arr = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: Math.max(0, Math.sin(i / 6) * 50 + i * 3) }));
  return arr;
}

function ProgressRing({ progress }: { progress: number }) {
  const size = 72;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#8a7dff" strokeWidth={stroke} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}

export default function YieldBox() {
  const [mode, setMode] = useState<"deployed" | "profit">("deployed");
  const totalDeployed = yields.reduce((a, y) => a + y.deployed, 0);
  const avgApy = yields.length ? yields.reduce((a, y) => a + y.apy_est, 0) / yields.length : 0;
  const pnlMtd = yields.reduce((a, y) => a + y.pnl_mtd, 0);
  const progress = Math.min(1, avgApy);

  return (
    <GlassCard className="accent-glow-violet">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-400">Market-Making / Yield</div>
          <div className="text-2xl font-semibold">{formatCurrency(totalDeployed)} deployed</div>
          <div className="text-xs mt-1 text-zinc-400">APY {formatPercent(avgApy)} · P&L MTD {formatCurrency(pnlMtd)}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs">
            <div className="text-zinc-400">Live Yield</div>
            <div className="text-neon-violet">{formatPercent(avgApy)}</div>
          </div>
          <ProgressRing progress={progress} />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <button onClick={() => setMode("deployed")} className={`glass px-3 py-1 rounded-full ${mode === "deployed" ? "text-neon-cyan" : "text-zinc-300"}`}>Deployed</button>
        <button onClick={() => setMode("profit")} className={`glass px-3 py-1 rounded-full ${mode === "profit" ? "text-neon-cyan" : "text-zinc-300"}`}>Profit history</button>
      </div>

      {mode === "deployed" ? (
        <div className="mt-3 space-y-2 text-sm">
          {yields.map((y) => (
            <div key={y.id} className="flex items-center justify-between">
              <span className="text-zinc-300">{y.venue} · {y.strategy}</span>
              <span className="font-medium">{formatCurrency(y.deployed)} · {formatPercent(y.apy_est)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-24 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profitHistory()}>
              <Tooltip contentStyle={{ background: "rgba(15,18,28,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#e6e9ef" }} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
              <Area type="monotone" dataKey="value" stroke="#00e5ff" fill="url(#grad)" strokeWidth={2} />
              <defs>
                <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </GlassCard>
  );
}


