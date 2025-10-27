"use client";

import GlassCard from "../../components/GlassCard";
import { transactions } from "../../lib/dummyData";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "../../lib/utils";

const COLORS = ["#8a7dff", "#00e5ff", "#ffc86b", "#5ad6a0", "#e580ff", "#ff9a7b"]; 

export default function ExpensesBox() {
  const out = transactions.filter((t) => t.type === "out");
  const total = out.reduce((a, t) => a + Math.abs(t.amount), 0);
  const byCat: Record<string, number> = {};
  out.forEach((t) => {
    byCat[t.category] = (byCat[t.category] || 0) + Math.abs(t.amount);
  });
  const data = Object.entries(byCat).map(([name, value]) => ({ name, value }));
  const dailyBurn = total / 30;
  const avg30 = total / 30;
  const today = out.filter((t) => t.date.startsWith(new Date().toISOString().slice(0, 10))).reduce((a, t) => a + Math.abs(t.amount), 0);
  const anomaly = today > avg30 * 1.2;

  return (
    <GlassCard className="accent-glow-violet">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-400">Expenses (MTD)</div>
          <div className="text-2xl font-semibold">{formatCurrency(total)}</div>
          <div className="text-xs mt-1 text-zinc-400">Daily burn {formatCurrency(dailyBurn)}</div>
        </div>
        {anomaly && (
          <div className="text-xs text-neon-amber">Anomaly: +20% vs 30d avg</div>
        )}
      </div>
      <div className="h-24 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip contentStyle={{ background: "rgba(15,18,28,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#e6e9ef" }} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={24} outerRadius={44} paddingAngle={3}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-300">
        {data.slice(0, 6).map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <span>{d.name}</span>
            <span className="font-medium">{formatCurrency(d.value)}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}


