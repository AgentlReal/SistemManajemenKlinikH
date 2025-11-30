import { useAuth } from "@/hooks/use-auth";

const mappedRole = {
  admin: "admin",
  receptionist: "resepsionis",
  doctor: "dokter",
  cashier: "kasir",
  lab: "staf lab",
  manager: "manajer",
};

export function DashboardHome() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1>Selamat Datang di SIMAK{user ? `, ${user.name}!` : "!"}</h1>
        <p className="text-muted-foreground mt-1">
          Silahkan mengakses menu {user?.role && mappedRole[user.role]} di tab
          sebelah kiri
        </p>
      </div>
    </div>
  );
}
