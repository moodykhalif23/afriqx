import { useToast } from "primevue/usetoast";

export function useStub() {
  const toast = useToast();
  return (
    summary = "Coming soon",
    detail = "This action isn't wired up in the preview yet.",
    severity: "info" | "success" | "warn" = "info",
  ) => toast.add({ severity, summary, detail, life: 2500 });
}
