import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "./components/DashboardLayout";
import { LoginPage } from "./components/LoginPage";
import { DashboardHome } from "./components/pages/DashboardHome";
import { ElectronicMedicalRecords } from "./components/pages/ElectronicMedicalRecords";
import { ManagePatients } from "./components/pages/ManagePatients";
import { ManageQueue } from "./components/pages/ManageQueue";
import { MasterData } from "./components/pages/MasterData";
import { Reports } from "./components/pages/Reports";
import { Transactions } from "./components/pages/Transactions";
import { Toaster } from "./components/ui/sonner";
import { useAuth } from "./hooks/use-auth";

const queryClient = new QueryClient();

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const auth = useAuth();

  const handleLogin = async (username: string, password: string) => {
    try {
      await auth.login(username, password);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Username atau password salah");
        return;
      }
      toast.error("Error Login");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      setCurrentPage("dashboard");
    } catch {
      toast.error("Error Unexpected");
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardHome />;
      case "patients":
        return <ManagePatients />;
      case "queue":
        return <ManageQueue />;
      case "records":
        return <ElectronicMedicalRecords />;
      case "transactions":
        return <Transactions />;
      case "master":
        return <MasterData />;
      case "reports":
        return <Reports />;
      default:
        return <DashboardHome />;
    }
  };

  if (auth.loading) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center h-screen">
        <p>Tunggu Sebentar...</p>
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!auth.user) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <LoginPage onLogin={handleLogin} />
          <Toaster position="top-right" />
        </QueryClientProvider>
      </>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DashboardLayout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        >
          {renderPage()}
        </DashboardLayout>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </>
  );
}
