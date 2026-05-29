import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { NEWS_FEATURED, NEWS_FEED } from "../data/mock.ts";

const catClass: Record<string, string> = {
  Markets: "badge-soft badge-success",
  Equities: "badge-soft badge-warning",
  Economy: "badge-soft badge-neutral",
  FX: "badge-soft badge-success",
  Technology: "badge-soft badge-warning",
};

export default define.page(function News() {
  return (
    <>
      <Head>
        <title>News & Insights · AFRIQX</title>
      </Head>
      <AppShell active="News & Insights" title="News">
        <div class="mb-4">
          <h1 class="font-display text-xl font-bold text-base-content sm:text-2xl">
            News &amp; Insights
          </h1>
          <p class="text-sm text-base-content/60">
            Continental market intelligence, updated through the trading day.
          </p>
        </div>

        {/* Featured carousel */}
        <div class="carousel carousel-center w-full gap-4 rounded-2xl pb-2">
          {NEWS_FEATURED.map((f) => (
            <div
              key={f.title}
              class="carousel-item w-[85%] sm:w-[420px]"
            >
              <article
                class={`card-3d relative flex h-48 w-full flex-col justify-end overflow-hidden rounded-2xl border border-base-300 bg-gradient-to-br ${f.accent} to-base-200 p-5`}
              >
                <span
                  class={`badge badge-sm mb-2 w-fit font-semibold uppercase tracking-wider ${
                    catClass[f.category] ?? "badge-soft badge-neutral"
                  }`}
                >
                  {f.category}
                </span>
                <h3 class="font-display text-lg font-bold leading-snug text-base-content">
                  {f.title}
                </h3>
                <p class="mt-1 line-clamp-2 text-sm text-base-content/70">
                  {f.excerpt}
                </p>
                <span class="mt-2 text-[11px] text-base-content/50">
                  {f.time}
                </span>
              </article>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {NEWS_FEED.map((item) => (
            <Card key={item.title} class="hover-lift">
              <div class="flex gap-3">
                <div class="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-base-300 to-base-100 text-base-content/40">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 9h18" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium leading-snug text-base-content">
                    {item.title}
                  </p>
                  <div class="mt-1.5 flex items-center gap-2">
                    <span
                      class={`badge badge-xs font-semibold uppercase tracking-wider ${
                        catClass[item.category] ?? "badge-soft badge-neutral"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span class="text-[11px] text-base-content/40">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </AppShell>
    </>
  );
});
