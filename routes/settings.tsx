import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { USER } from "../data/mock.ts";

function Section(
  { title, desc, name, open, children }: {
    title: string;
    desc: string;
    name: string;
    open?: boolean;
    children: ComponentChildren;
  },
) {
  return (
    <div class="collapse-arrow join-item collapse border border-base-300 bg-base-200">
      <input type="radio" name={name} checked={open} />
      <div class="collapse-title">
        <div class="font-display font-semibold text-base-content">{title}</div>
        <div class="text-xs text-base-content/50">{desc}</div>
      </div>
      <div class="collapse-content space-y-4">{children}</div>
    </div>
  );
}

function Row(
  { label, hint, children }: {
    label: string;
    hint?: string;
    children: ComponentChildren;
  },
) {
  return (
    <div class="flex items-center justify-between gap-4 border-t border-base-300/60 pt-4 first:border-0 first:pt-0">
      <div class="min-w-0">
        <div class="text-sm font-medium text-base-content">{label}</div>
        {hint && <div class="text-xs text-base-content/50">{hint}</div>}
      </div>
      <div class="shrink-0">{children}</div>
    </div>
  );
}

export default define.page(function Settings() {
  return (
    <>
      <Head>
        <title>Settings · AFRIQX</title>
      </Head>
      <AppShell active="Settings" title="Settings">
        <div class="mx-auto max-w-3xl">
          <div class="mb-6">
            <h1 class="font-display text-xl font-bold text-base-content sm:text-2xl">
              Settings
            </h1>
            <p class="text-sm text-base-content/60">
              Manage your profile, security and preferences.
            </p>
          </div>

          <div class="join join-vertical w-full">
            <Section
              name="settings"
              title="Profile"
              desc="Your account details"
              open
            >
              <Row label="Full name">
                <input
                  type="text"
                  value={USER.name}
                  class="input input-sm w-48 border-base-300 bg-base-100"
                />
              </Row>
              <Row label="Email">
                <input
                  type="email"
                  value="amara@afriqx.africa"
                  class="input input-sm w-56 border-base-300 bg-base-100"
                />
              </Row>
              <Row label="Base currency" hint="Used for portfolio valuation">
                <select class="select select-sm w-32 border-base-300 bg-base-100">
                  <option>KES</option>
                  <option>NGN</option>
                  <option>ZAR</option>
                  <option>USD</option>
                </select>
              </Row>
            </Section>

            <Section
              name="settings"
              title="Security"
              desc="Protect your account"
            >
              <Row label="Two-factor authentication" hint="Recommended">
                <input type="checkbox" class="toggle toggle-success" checked />
              </Row>
              <Row label="Biometric login" hint="Face / fingerprint on mobile">
                <input type="checkbox" class="toggle toggle-success" checked />
              </Row>
              <Row label="Change password">
                <button
                  type="button"
                  class="btn btn-sm btn-outline btn-neutral"
                >
                  Update
                </button>
              </Row>
            </Section>

            <Section
              name="settings"
              title="Notifications"
              desc="Choose what reaches you"
            >
              <Row label="Price alerts">
                <input type="checkbox" class="toggle toggle-success" checked />
              </Row>
              <Row label="Order fills">
                <input type="checkbox" class="toggle toggle-success" checked />
              </Row>
              <Row label="Market news digest" hint="Daily at 08:00 EAT">
                <input type="checkbox" class="toggle toggle-success" />
              </Row>
              <Row label="AI market summaries">
                <input type="checkbox" class="toggle toggle-success" checked />
              </Row>
            </Section>

            <Section
              name="settings"
              title="Preferences"
              desc="Tune the experience"
            >
              <Row label="Theme" hint="AFRIQX dark is optimised for terminals">
                <select class="select select-sm w-36 border-base-300 bg-base-100">
                  <option>AFRIQX Dark</option>
                  <option>Obsidian</option>
                </select>
              </Row>
              <Row label="Compact data tables">
                <input type="checkbox" class="toggle toggle-success" checked />
              </Row>
              <Row label="Show ticker bar">
                <input type="checkbox" class="toggle toggle-success" checked />
              </Row>
            </Section>
          </div>

          <div class="mt-5 flex justify-end gap-3">
            <button type="button" class="btn btn-ghost">Cancel</button>
            <button type="button" class="btn btn-primary font-display">
              Save changes
            </button>
          </div>
        </div>
      </AppShell>
    </>
  );
});
