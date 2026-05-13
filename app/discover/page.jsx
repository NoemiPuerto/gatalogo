import AppShell from "@/components/AppShell";
import SwipeDeck from "@/components/SwipeDeck";
import { demoCats } from "@/lib/demoData";

export default function DiscoverPage() {
  return <AppShell><div className="px-4 py-10"><SwipeDeck cats={demoCats} /></div></AppShell>;
}
