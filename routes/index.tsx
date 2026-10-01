import { createFileRoute } from "@tanstack/react-router";
import { HubApp } from "@/components/hub/hub-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HubApp />;
}
