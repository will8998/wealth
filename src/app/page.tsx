import TopNav from "../components/TopNav";
import RightRail from "../components/RightRail";
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
      <div className="flex gap-4 px-4 sm:px-6 pb-6">
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <IncomeBox />
          <ExpensesBox />
          <YieldBox />
          <SavingsBox />
        </main>
        <div className="hidden lg:block">
          <RightRail />
        </div>
      </div>
    </div>
  );
}
