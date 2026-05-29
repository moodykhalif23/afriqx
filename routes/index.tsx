import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { IndexStrip } from "../components/dashboard/IndexStrip.tsx";
import { ChartPanel } from "../components/dashboard/ChartPanel.tsx";
import { WatchlistPanel } from "../components/dashboard/WatchlistPanel.tsx";
import { FxHeatmap } from "../components/dashboard/FxHeatmap.tsx";
import { RecentOrders } from "../components/dashboard/RecentOrders.tsx";
import { MarketMovers } from "../components/dashboard/MarketMovers.tsx";
import { NewsPanel } from "../components/dashboard/NewsPanel.tsx";
import { PortfolioOverview } from "../components/dashboard/PortfolioOverview.tsx";

export default define.page(function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard · AFRIQX</title>
      </Head>
      <AppShell active="Dashboard" title="Dashboard">
        <IndexStrip />

        {/* Main grid: chart + right rail */}
        <div class="mt-3 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-5 xl:grid-cols-[1fr_360px]">
          <div class="min-w-0 space-y-3 sm:space-y-5">
            <ChartPanel />

            {/* Lower trio */}
            <div class="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-3">
              <MarketMovers />
              <NewsPanel />
              <PortfolioOverview />
            </div>
          </div>

          <div class="space-y-3 sm:space-y-5">
            <WatchlistPanel />
            <FxHeatmap />
            <RecentOrders />
          </div>
        </div>
      </AppShell>
    </>
  );
});
