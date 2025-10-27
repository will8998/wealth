import TopNav from "../components/TopNav";
import IncomeBox from "../components/boxes/IncomeBox";
import ExpensesBox from "../components/boxes/ExpensesBox";
import YieldBox from "../components/boxes/YieldBox";
import SavingsBox from "../components/boxes/SavingsBox";
import TopMetrics from "../components/TopMetrics";

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <TopMetrics />
      <main className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-4 sm:px-6 pb-6">
        <IncomeBox />
        <ExpensesBox />
        <YieldBox />
        <SavingsBox />
      </main>
    </div>
  );
}
