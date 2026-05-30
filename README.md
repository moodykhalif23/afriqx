# AFRIQX

**The Operating System for African Capital Markets.**

A pan-African financial exchange platform — built with Vue 3, PrimeVue and
Apache ECharts.

## Stack

- **Vue 3** + **Vite 6** + **TypeScript**
- **PrimeVue 4** (custom AFRIQX Aura theme — emerald/obsidian)
- **Apache ECharts** (via `vue-echarts`) — candlesticks, sparklines, donuts, lines
- **Tailwind CSS v4** for layout + brand tokens
- **vue-router** for the 10 app sections

## Usage

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the build
```

## Structure

```
src/
  main.ts            app bootstrap (PrimeVue, router, ECharts)
  router.ts          routes for all sections
  styles.css         Tailwind + AFRIQX brand tokens
  theme/preset.ts    custom PrimeVue Aura preset
  echarts.ts         tree-shaken ECharts registration
  data/mock.ts       static mock market data
  components/
    ui/              Logo, Card, PriceChange
    shell/           AppShell, AppSidebar, AppTopbar, BottomNav, TickerBar
    charts/          CandleChart, Sparkline, DonutChart, LineChart, FxHeatmap
  views/             Dashboard, Markets, Trade, Portfolio, Watchlist,
                     Orders, Analytics, News, Explore, Settings
```
