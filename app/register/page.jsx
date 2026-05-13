import AppShell from "@/components/AppShell";
import AuthForm from "@/components/AuthForm";

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;
  const initialRole = String(params?.role || "").toLowerCase() === "shelter" ? "SHELTER" : "ADOPTER";
  return <AppShell><div className="px-4 py-16"><AuthForm mode="register" initialRole={initialRole} /></div></AppShell>;
}
