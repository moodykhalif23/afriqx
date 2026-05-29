import { Card } from "../ui/Card.tsx";
import { NEWS } from "../../data/mock.ts";

const CAT_COLORS: Record<string, string> = {
  Markets: "text-emerald-300 bg-emerald-500/15",
  Equities: "text-gold-300 bg-gold-500/15",
  Economy: "text-platinum-200 bg-obsidian-600",
};

export function NewsPanel() {
  return (
    <Card title="News & Insights" action={<a href="#">View all</a>}>
      <ul class="space-y-4">
        {NEWS.map((item) => (
          <li class="flex gap-3">
            <div class="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-obsidian-600 to-obsidian-700 text-platinum-400">
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
              <p class="line-clamp-2 text-sm font-medium leading-snug text-ivory">
                {item.title}
              </p>
              <div class="mt-1.5 flex items-center gap-2">
                <span
                  class={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                    CAT_COLORS[item.category] ??
                      "text-platinum-300 bg-obsidian-600"
                  }`}
                >
                  {item.category}
                </span>
                <span class="text-[11px] text-platinum-400">{item.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
