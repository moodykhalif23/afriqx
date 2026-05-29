import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Sidebar } from "../components/dashboard/Sidebar.tsx";
import { Topbar } from "../components/dashboard/Topbar.tsx";
import { IndexStrip } from "../components/dashboard/IndexStrip.tsx";
import { ChartPanel } from "../components/dashboard/ChartPanel.tsx";
import { WatchlistPanel } from "../components/dashboard/WatchlistPanel.tsx";
import { FxHeatmap } from "../components/dashboard/FxHeatmap.tsx";
import { RecentOrders } from "../components/dashboard/RecentOrders.tsx";
import { MarketMovers } from "../components/dashboard/MarketMovers.tsx";
import { NewsPanel } from "../components/dashboard/NewsPanel.tsx";
import { PortfolioOverview } from "../components/dashboard/PortfolioOverview.tsx";
import { TickerBar } from "../components/dashboard/TickerBar.tsx";

export default define.page(function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard · AFRIQX</title>
      </Head>
      <div class="flex h-screen overflow-hidden bg-obsidian-900 text-ivory">
        <Sidebar />

        <div class="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main class="flex-1 overflow-y-auto p-5">
            <IndexStrip />

            {/* Main grid: chart + right rail */}
            <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
              <div class="min-w-0 space-y-5">
                <ChartPanel />

                {/* Lower trio */}
                <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
                  <MarketMovers />
                  <NewsPanel />
                  <PortfolioOverview />
                </div>
              </div>

              <div class="space-y-5">
                <WatchlistPanel />
                <FxHeatmap />
                <RecentOrders />
              </div>
            </div>
          </main>

          <TickerBar />
        </div>
      </div>
    </>
  );
});
