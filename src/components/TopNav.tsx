"use client";

import { Wallet, Upload, AlertTriangle } from "lucide-react";
import { formatCurrency } from "../lib/utils";
import { balances, transactions } from "../lib/dummyData";
import { motion } from "framer-motion";

function sum(array: number[]) {
  return array.reduce((a, b) => a + b, 0);
}

function computeLiquidity() {
  const total = sum(balances.map((b) => b.amount));
  const t0 = sum(balances.filter((b) => b.liquidity_bucket === "T0").map((b) => b.amount));
  return { total, t0, ratio: total ? t0 / total : 0 };
}

export default function TopNav() {
  const { total, t0, ratio } = computeLiquidity();
  const mtdIncome = sum(
    transactions
      .filter((t) => t.type === "in")
      .map((t) => t.amount)
  );

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-4">
      <div className="flex items-center gap-3">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="glass neon-border px-3 py-1.5 rounded-full">
          <span className="text-xs tracking-widest uppercase text-neon-cyan">Wealth</span>
        </motion.div>
        <h1 className="text-lg sm:text-xl font-medium">Family Office Cockpit</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="glass px-3 py-2 rounded-lg hidden sm:flex items-center gap-2">
          <Wallet size={16} className="text-neon-violet" />
          <span className="text-xs text-zinc-300">T0 Liquidity</span>
          <span className="text-sm font-semibold">{formatCurrency(t0)}</span>
          <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden ml-2">
            <div className="h-full bg-cyan-400/80" style={{ width: `${Math.round(ratio * 100)}%` }} />
          </div>
        </div>
        <button className="glass px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:accent-glow-cyan">
          <Upload size={16} />
          Import CSV
        </button>
        <button className="glass px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:accent-glow-amber">
          <AlertTriangle size={16} className="text-neon-amber" />
          {formatCurrency(mtdIncome)} MTD
        </button>
      </div>
    </div>
  );
}


