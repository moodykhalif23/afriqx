import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en" class="dark" data-theme="afriqx">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="AFRIQX — The Operating System for African Capital Markets. African Markets. African Value. African Future."
        />
        <meta name="theme-color" content="#0a0e0c" />
        <title>AFRIQX — The Operating System for African Capital Markets</title>

        {/* Brand typography: Satoshi (display), Inter (body), JetBrains Mono (data) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body class="bg-obsidian-900 text-ivory font-sans antialiased">
        <Component />
      </body>
    </html>
  );
});
