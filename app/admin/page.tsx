import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminIndexPage() {
  const ok = await isAdminAuthenticated();
  redirect(ok ? "/admin/dashboard" : "/admin/login");
}
