import RoleBasedNavigation from "@/components/RoleBasedNavigation";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#fff7f2] text-slate-900">
      <RoleBasedNavigation />
      <main>{children}</main>
    </div>
  );
}
