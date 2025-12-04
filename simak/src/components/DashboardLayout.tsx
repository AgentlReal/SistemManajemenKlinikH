import { APP_NAME } from "@/constants";
import { useAuth } from "@/hooks/use-auth";
import { updateUserAPI, type UserData } from "@/services/authServices";
import type { Role } from "@/types";
import startcase from "@stdlib/string-startcase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  BarChart3,
  Database,
  FileText,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Receipt,
  Settings,
  Users,
  type LucideProps,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AddUserModal, type UserUpdate } from "./modals/AddUserModal";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  authorizedRoles: Role[];
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Beranda",
    icon: LayoutDashboard,
    authorizedRoles: [
      "admin",
      "receptionist",
      "doctor",
      "lab",
      "cashier",
      "manager",
    ],
  },
  {
    id: "patients",
    label: "Pasien",
    icon: Users,
    authorizedRoles: ["admin", "receptionist", "doctor", "lab"],
  },
  {
    id: "queue",
    label: "Antrian",
    icon: ListOrdered,
    authorizedRoles: ["admin", "receptionist", "doctor"],
  },
  {
    id: "records",
    label: "Rekam Medis",
    icon: FileText,
    authorizedRoles: ["admin", "receptionist", "doctor", "lab"],
  },
  {
    id: "transactions",
    label: "Transaksi",
    icon: Receipt,
    authorizedRoles: ["admin", "doctor", "lab", "cashier"],
  },
  {
    id: "master",
    label: "Data Master",
    icon: Database,
    authorizedRoles: ["admin", "manager"],
  },
  {
    id: "reports",
    label: "Laporan",
    icon: BarChart3,
    authorizedRoles: ["admin", "manager"],
  },
];

const mappedRole = {
  admin: "admin",
  receptionist: "resepsionis",
  doctor: "dokter",
  cashier: "kasir",
  lab: "staf lab",
  manager: "manajer",
};

export function DashboardLayout({
  children,
  currentPage,
  onNavigate,
  onLogout,
}: DashboardLayoutProps) {
  const { user } = useAuth();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUser] = useState<UserData | null>(user);

  const queryClient = useQueryClient();

  const updateUserMutation = useMutation<
    UserData,
    Error,
    UserUpdate & { updatedAt: string }
  >({
    mutationFn: async (updatedUser) => {
      await updateUserAPI(updatedUser);
      toast.success("Akun berhasil diperbarui!");
      return {} as UserData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Akun gagal diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="h-14">
              <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center shadow-md shadow-green-200">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-800">{APP_NAME}</span>
                </div>
              </div>
            </SidebarGroupLabel>
            <Separator />
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  if (user && !item.authorizedRoles.includes(user.role)) return;
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        className="text-base"
                        title={item.label}
                      >
                        <button
                          onClick={() => {
                            onNavigate(item.id);
                          }}
                          className={`
                      w-full flex items-center gap-3 rounded-lg
                      transition-colors duration-150 h-16 
                      ${
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer"
                      }
                        `}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <Separator />
                <SidebarMenuItem className="">
                  <SidebarMenuButton asChild>
                    <Button
                      onClick={onLogout}
                      variant="ghost"
                      className="w-full h-16 justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <SidebarTrigger className="hover:cursor-pointer" />

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors hover:cursor-pointer">
                  <Avatar className="w-9 h-9 border-2 border-green-100">
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {user ? user.name[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm text-gray-900">
                      {user ? user.name : "Unknown User"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user ? startcase(mappedRole[user.role]) : "Unknown Role"}
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsAddUserModalOpen(true)}>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Akun
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => {
            setIsAddUserModalOpen(false);
          }}
          editingUser={
            editingUser && {
              username: editingUser.username,
              id: editingUser.id,
            }
          }
          addUser={null}
          onAdd={() => {}}
          onUpdate={updateUserMutation.mutate}
        />
      </div>
    </SidebarProvider>
  );
}
