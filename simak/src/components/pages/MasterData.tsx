import {
  createCashierAPI,
  deleteCashierAPI,
  fetchAllCashiersAPI,
  updateCashierAPI,
} from "@/services/cashierServices";
import {
  createDepartmentAPI,
  deleteDepartmentAPI,
  fetchAllDepartmentsAPI,
  updateDepartmentAPI,
} from "@/services/departmentServices";
import {
  createDoctorAPI,
  deleteDoctorAPI,
  fetchAllDoctorsAPI,
  updateDoctorAPI,
} from "@/services/doctorServices";
import {
  createLabStaffAPI,
  deleteLabStaffAPI,
  fetchAllLabStaffsAPI,
  updateLabStaffAPI,
} from "@/services/labStaffServices";
import {
  createReceptionistAPI,
  deleteReceptionistAPI,
  fetchAllReceptionistsAPI,
  updateReceptionistAPI,
} from "@/services/receptionistServices";
import {
  createServiceFeeAPI,
  deleteServiceFeeAPI,
  fetchAllServiceFeesAPI,
  updateServiceFeeAPI,
} from "@/services/serviceFeeServices";
import type {
  Cashier,
  ClinicInfo,
  Department,
  Doctor,
  LabStaff,
  Receptionist,
  Schedule,
  ServiceFee,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Beaker,
  Building,
  CalendarDays,
  DollarSign,
  Edit,
  Heart,
  Stethoscope,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AddCashierModal } from "../modals/AddCashierModal";
import { AddDepartmentModal } from "../modals/AddDepartmentModal";
import { AddDoctorModal } from "../modals/AddDoctorModal";
import { AddLabStaffModal } from "../modals/AddLabStaffModal";
import { AddReceptionistModal } from "../modals/AddReceptionistModal";
import { AddServiceFeeModal } from "../modals/AddServiceFeeModal";
import { DeleteConfirmModal } from "../modals/DeleteConfirmModal";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const clinicInfo: ClinicInfo = {
  name: "Klinik Haikhah",
  address:
    "Jl. Pramuka Gg. Rengas Sejahtera No. 1, Kabupaten Kubu Raya, Kalimantan Barat",
  phone: "+62 21 1234 5678",
  email: "klinikhaikhah@info.com",
  license: "CLINIC-LICENSE-2025-001",
  operatingHours: "24 Jam",
};

const schedules: Schedule[] = [
  {
    id: "1",
    employeeName: "Eve Martinez",
    startHour: "07:00 AM",
    endHour: "11:59 AM",
  },
  {
    id: "2",
    employeeName: "Charlie Brown",
    startHour: "01:00 PM",
    endHour: "06:00 PM",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function MasterData() {
  const [isAddReceptionistModalOpen, setIsAddReceptionistModalOpen] =
    useState(false);
  useState<Receptionist | null>(null);
  const [deleteReceptionistId, setDeleteReceptionistId] = useState<
    string | null
  >(null);
  const [editingReceptionist, setEditingReceptionist] =
    useState<Receptionist | null>(null);

  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  useState<Doctor | null>(null);
  const [deleteDoctorId, setDeleteDoctorId] = useState<string | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const [isAddCashierModalOpen, setIsAddCashierModalOpen] = useState(false);
  useState<Cashier | null>(null);
  const [deleteCashierId, setDeleteCashierId] = useState<string | null>(null);
  const [editingCashier, setEditingCashier] = useState<Cashier | null>(null);

  const [isAddLabStaffModalOpen, setIsAddLabStaffModalOpen] = useState(false);
  useState<LabStaff | null>(null);
  const [deleteLabStaffId, setDeleteLabStaffId] = useState<string | null>(null);
  const [editingLabStaff, setEditingLabStaff] = useState<LabStaff | null>(null);

  const [isAddServiceFeeModalOpen, setIsAddServiceFeeModalOpen] =
    useState(false);
  useState<ServiceFee | null>(null);
  const [deleteServiceFeeId, setDeleteServiceFeeId] = useState<string | null>(
    null
  );
  const [editingServiceFee, setEditingServiceFee] = useState<ServiceFee | null>(
    null
  );

  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] =
    useState(false);
  useState<Department | null>(null);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState<string | null>(
    null
  );
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );

  const [activeTab, setActiveTab] = useState("clinic");

  const queryClient = useQueryClient();

  //Receptionists Query and Mutations
  const receptionistQuery = useQuery<Receptionist[]>({
    queryKey: ["receptionists"],
    queryFn: () => fetchAllReceptionistsAPI(),
  });

  const createReceptionistMutation = useMutation<
    Receptionist,
    Error,
    Omit<Receptionist, "id" | "status">
  >({
    mutationFn: async (newReceptionist) => {
      await createReceptionistAPI(newReceptionist);
      toast.success("Queue entry added successfully!");
      return {} as Receptionist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
    onError: () => {
      toast.error("Query entry failed to create!");
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
  });
  const deleteReceptionistMutation = useMutation<Receptionist, Error, string>({
    mutationFn: async (id) => {
      await deleteReceptionistAPI(id);
      toast.success("Queue entry deleted successfully!");
      setDeleteReceptionistId(null);
      return {} as Receptionist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
    onError: () => {
      toast.error("Query entry failed to delete!");
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
  });
  const updateReceptionistMutation = useMutation<
    Receptionist,
    Error,
    Receptionist
  >({
    mutationFn: async (updatedQueue) => {
      await updateReceptionistAPI(updatedQueue);
      toast.success("Queue entry updated successfully!");
      setEditingReceptionist(null);
      return {} as Receptionist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
    onError: () => {
      toast.error("Query entry failed to update!");
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
  });

  //Doctor Query and Mutations
  const doctorQuery = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: () => fetchAllDoctorsAPI(),
  });

  const createDoctorMutation = useMutation<
    Doctor,
    Error,
    Omit<Doctor, "id" | "status">
  >({
    mutationFn: async (newDoctor) => {
      await createDoctorAPI(newDoctor);
      toast.success("Queue entry added successfully!");
      return {} as Doctor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => {
      toast.error("Query entry failed to create!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
  const deleteDoctorMutation = useMutation<Doctor, Error, string>({
    mutationFn: async (id) => {
      await deleteDoctorAPI(id);
      toast.success("Queue entry deleted successfully!");
      setDeleteDoctorId(null);
      return {} as Doctor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => {
      toast.error("Query entry failed to delete!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
  const updateDoctorMutation = useMutation<Doctor, Error, Doctor>({
    mutationFn: async (updatedQueue) => {
      await updateDoctorAPI(updatedQueue);
      toast.success("Queue entry updated successfully!");
      setEditingDoctor(null);
      return {} as Doctor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => {
      toast.error("Query entry failed to update!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  //Cashiers Query and Mutations
  const cashierQuery = useQuery<Cashier[]>({
    queryKey: ["cashiers"],
    queryFn: () => fetchAllCashiersAPI(),
  });

  const createCashierMutation = useMutation<
    Cashier,
    Error,
    Omit<Cashier, "id" | "status">
  >({
    mutationFn: async (newCashier) => {
      await createCashierAPI(newCashier);
      toast.success("Queue entry added successfully!");
      return {} as Cashier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
    onError: () => {
      toast.error("Query entry failed to create!");
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
  });
  const deleteCashierMutation = useMutation<Cashier, Error, string>({
    mutationFn: async (id) => {
      await deleteCashierAPI(id);
      toast.success("Queue entry deleted successfully!");
      setDeleteCashierId(null);
      return {} as Cashier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
    onError: () => {
      toast.error("Query entry failed to delete!");
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
  });
  const updateCashierMutation = useMutation<Cashier, Error, Cashier>({
    mutationFn: async (updatedQueue) => {
      await updateCashierAPI(updatedQueue);
      toast.success("Queue entry updated successfully!");
      setEditingCashier(null);
      return {} as Cashier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
    onError: () => {
      toast.error("Query entry failed to update!");
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
  });

  //LabStaffs Query and Mutations
  const labStaffQuery = useQuery<LabStaff[]>({
    queryKey: ["labStaffs"],
    queryFn: () => fetchAllLabStaffsAPI(),
  });

  const createLabStaffMutation = useMutation<
    LabStaff,
    Error,
    Omit<LabStaff, "id" | "status">
  >({
    mutationFn: async (newLabStaff) => {
      await createLabStaffAPI(newLabStaff);
      toast.success("Queue entry added successfully!");
      return {} as LabStaff;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
    onError: () => {
      toast.error("Query entry failed to create!");
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
  });
  const deleteLabStaffMutation = useMutation<LabStaff, Error, string>({
    mutationFn: async (id) => {
      await deleteLabStaffAPI(id);
      toast.success("Queue entry deleted successfully!");
      setDeleteLabStaffId(null);
      return {} as LabStaff;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
    onError: () => {
      toast.error("Query entry failed to delete!");
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
  });
  const updateLabStaffMutation = useMutation<LabStaff, Error, LabStaff>({
    mutationFn: async (updatedQueue) => {
      await updateLabStaffAPI(updatedQueue);
      toast.success("Queue entry updated successfully!");
      setEditingLabStaff(null);
      return {} as LabStaff;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
    onError: () => {
      toast.error("Query entry failed to update!");
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
  });

  //ServiceFees Query and Mutations
  const serviceFeeQuery = useQuery<ServiceFee[]>({
    queryKey: ["serviceFees"],
    queryFn: () => fetchAllServiceFeesAPI(),
  });

  const createServiceFeeMutation = useMutation<
    ServiceFee,
    Error,
    Omit<ServiceFee, "id" | "status">
  >({
    mutationFn: async (newServiceFee) => {
      await createServiceFeeAPI(newServiceFee);
      toast.success("Queue entry added successfully!");
      return {} as ServiceFee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
    onError: () => {
      toast.error("Query entry failed to create!");
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
  });
  const deleteServiceFeeMutation = useMutation<ServiceFee, Error, string>({
    mutationFn: async (id) => {
      await deleteServiceFeeAPI(id);
      toast.success("Queue entry deleted successfully!");
      setDeleteServiceFeeId(null);
      return {} as ServiceFee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
    onError: () => {
      toast.error("Query entry failed to delete!");
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
  });
  const updateServiceFeeMutation = useMutation<ServiceFee, Error, ServiceFee>({
    mutationFn: async (updatedQueue) => {
      await updateServiceFeeAPI(updatedQueue);
      toast.success("Queue entry updated successfully!");
      setEditingServiceFee(null);
      return {} as ServiceFee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
    onError: () => {
      toast.error("Query entry failed to update!");
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
  });

  //Departments Query and Mutations
  const departmentQuery = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: () => fetchAllDepartmentsAPI(),
  });

  const createDepartmentMutation = useMutation<
    Department,
    Error,
    Omit<Department, "id" | "status">
  >({
    mutationFn: async (newDepartment) => {
      await createDepartmentAPI(newDepartment);
      toast.success("Queue entry added successfully!");
      return {} as Department;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => {
      toast.error("Query entry failed to create!");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
  const deleteDepartmentMutation = useMutation<Department, Error, string>({
    mutationFn: async (id) => {
      await deleteDepartmentAPI(id);
      toast.success("Queue entry deleted successfully!");
      setDeleteDepartmentId(null);
      return {} as Department;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => {
      toast.error("Query entry failed to delete!");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
  const updateDepartmentMutation = useMutation<Department, Error, Department>({
    mutationFn: async (updatedQueue) => {
      await updateDepartmentAPI(updatedQueue);
      toast.success("Queue entry updated successfully!");
      setEditingDepartment(null);
      return {} as Department;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => {
      toast.error("Query entry failed to update!");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const receptionistColumns: ColumnDef<Receptionist>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "phone",
      header: "No Telp",
    },
    {
      accessorKey: "wage",
      header: "Gaji",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingReceptionist(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteReceptionistId(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const doctorColumns: ColumnDef<Doctor>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "phone",
      header: "No Telp",
    },
    {
      accessorKey: "wage",
      header: "Gaji",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingDoctor(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteDoctorId(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const cashierColumns: ColumnDef<Cashier>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "phone",
      header: "No Telp",
    },
    {
      accessorKey: "wage",
      header: "Gaji",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingCashier(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteCashierId(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const labStaffColumns: ColumnDef<LabStaff>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "phone",
      header: "No Telp",
    },
    {
      accessorKey: "wage",
      header: "Gaji",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingLabStaff(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteLabStaffId(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
  const serviceFeeColumns: ColumnDef<ServiceFee>[] = [
    {
      accessorKey: "service",
      header: "Nama Layanan",
    },
    {
      accessorKey: "category",
      header: "Kategori",
    },
    {
      accessorKey: "fee",
      header: "Tarif",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingServiceFee(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteServiceFeeId(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
  const departmentColumns: ColumnDef<Department>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nama Poli",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingDepartment(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteDepartmentId(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
  const scheduleColumns: ColumnDef<Schedule>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "employeeName",
      header: "Nama Karyawan",
    },
    {
      accessorKey: "startHour",
      header: "Jam Mulai",
    },
    {
      accessorKey: "endHour",
      header: "Jam Selesai",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1>Kelola Data Master</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola data master
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8 lg:grid-cols-8">
          <TabsTrigger
            value="clinic"
            className="hover:cursor-pointer"
            title="Info Klinik"
          >
            <Building className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Info Klinik</span>
          </TabsTrigger>
          <TabsTrigger
            value="receptionists"
            className="hover:cursor-pointer"
            title="Resepsionis"
          >
            <Users className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Resepsionis</span>
          </TabsTrigger>
          <TabsTrigger
            value="doctors"
            className="hover:cursor-pointer"
            title="Dokter"
          >
            <Stethoscope className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Dokter</span>
          </TabsTrigger>
          <TabsTrigger
            value="cashiers"
            className="hover:cursor-pointer"
            title="Kasir"
          >
            <Wallet className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Kasir</span>
          </TabsTrigger>
          <TabsTrigger
            value="lab"
            className="hover:cursor-pointer"
            title="Staff Lab"
          >
            <Beaker className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Staff Lab</span>
          </TabsTrigger>
          <TabsTrigger
            value="fees"
            className="hover:cursor-pointer"
            title="Tarif Layanan"
          >
            <DollarSign className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Tarif Layanan</span>
          </TabsTrigger>
          <TabsTrigger
            value="departments"
            className="hover:cursor-pointer"
            title="Poli"
          >
            <Heart className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Poli</span>
          </TabsTrigger>
          <TabsTrigger
            value="schedules"
            className="hover:cursor-pointer"
            title="Poli"
          >
            <CalendarDays className="w-4 h-4 mr-2 block" />
            <span className="hidden sm:inline">Jadwal</span>
          </TabsTrigger>
        </TabsList>

        {/* Clinic Info */}
        <TabsContent value="clinic" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Informasi Klinik</CardTitle>
              <Button className="bg-green-600 hover:bg-green-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Info
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Klinik</p>
                  <p className="mt-1">{clinicInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No Lisensi</p>
                  <p className="mt-1 font-mono">{clinicInfo.license}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alamat</p>
                  <p className="mt-1">{clinicInfo.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No Telp</p>
                  <p className="mt-1">{clinicInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="mt-1">{clinicInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Jam Beroperasi
                  </p>
                  <p className="mt-1">{clinicInfo.operatingHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receptionists */}
        <TabsContent value="receptionists" className="space-y-4">
          <Card>
            <CardContent>
              <DataTable
                data={receptionistQuery.data}
                columns={receptionistColumns}
                title="resepsionis"
                onAdd={() => setIsAddReceptionistModalOpen(true)}
                isLoading={receptionistQuery.isLoading}
                isRefetching={receptionistQuery.isRefetching}
                error={receptionistQuery.error}
                onRefresh={() =>
                  queryClient.invalidateQueries({ queryKey: ["receptionists"] })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Doctors */}
        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardContent>
              <DataTable
                data={doctorQuery.data}
                columns={doctorColumns}
                title="dokter"
                onAdd={() => setIsAddDoctorModalOpen(true)}
                isLoading={doctorQuery.isLoading}
                isRefetching={doctorQuery.isRefetching}
                error={doctorQuery.error}
                onRefresh={() =>
                  queryClient.invalidateQueries({ queryKey: ["doctors"] })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cashiers */}
        <TabsContent value="cashiers" className="space-y-4">
          <Card>
            <CardContent>
              <DataTable
                data={cashierQuery.data}
                columns={cashierColumns}
                title="kasir"
                onAdd={() => setIsAddCashierModalOpen(true)}
                isLoading={cashierQuery.isLoading}
                isRefetching={cashierQuery.isRefetching}
                error={cashierQuery.error}
                onRefresh={() =>
                  queryClient.invalidateQueries({ queryKey: ["cashiers"] })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Staff */}
        <TabsContent value="lab" className="space-y-4">
          <Card>
            <CardContent>
              <DataTable
                data={labStaffQuery.data}
                columns={labStaffColumns}
                title="staff lab"
                onAdd={() => setIsAddLabStaffModalOpen(true)}
                isLoading={labStaffQuery.isLoading}
                isRefetching={labStaffQuery.isRefetching}
                error={labStaffQuery.error}
                onRefresh={() =>
                  queryClient.invalidateQueries({ queryKey: ["labStaffs"] })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Fees */}
        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardContent>
              <DataTable
                data={serviceFeeQuery.data}
                columns={serviceFeeColumns}
                title="tarif layanan"
                onAdd={() => setIsAddServiceFeeModalOpen(true)}
                isLoading={serviceFeeQuery.isLoading}
                isRefetching={serviceFeeQuery.isRefetching}
                error={serviceFeeQuery.error}
                onRefresh={() =>
                  queryClient.invalidateQueries({ queryKey: ["serviceFees"] })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardContent>
              <DataTable
                data={departmentQuery.data}
                columns={departmentColumns}
                title="poli"
                onAdd={() => setIsAddDepartmentModalOpen(true)}
                isLoading={departmentQuery.isLoading}
                isRefetching={departmentQuery.isRefetching}
                error={departmentQuery.error}
                onRefresh={() =>
                  queryClient.invalidateQueries({ queryKey: ["departments"] })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardContent>
              <DataTable
                data={schedules}
                columns={scheduleColumns}
                title="jadwal karyawan"
                onAdd={() => {}}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddReceptionistModal
        isOpen={isAddReceptionistModalOpen || editingReceptionist !== null}
        onClose={() => {
          setIsAddReceptionistModalOpen(false);
          setEditingReceptionist(null);
        }}
        onAdd={createReceptionistMutation.mutate}
        editingReceptionist={editingReceptionist}
        onUpdate={updateReceptionistMutation.mutate}
      />
      <DeleteConfirmModal
        isOpen={deleteReceptionistId !== null}
        onClose={() => setDeleteReceptionistId(null)}
        onConfirm={() =>
          deleteReceptionistId &&
          deleteReceptionistMutation.mutate(deleteReceptionistId)
        }
        title="Delete Receptionist"
        description="Are you sure you want to delete this receptionist? This action cannot be undone."
      />

      <AddDoctorModal
        isOpen={isAddDoctorModalOpen || editingDoctor !== null}
        onClose={() => {
          setIsAddDoctorModalOpen(false);
          setEditingDoctor(null);
        }}
        onAdd={createDoctorMutation.mutate}
        editingDoctor={editingDoctor}
        onUpdate={updateDoctorMutation.mutate}
      />
      <DeleteConfirmModal
        isOpen={deleteDoctorId !== null}
        onClose={() => setDeleteDoctorId(null)}
        onConfirm={() =>
          deleteDoctorId && deleteDoctorMutation.mutate(deleteDoctorId)
        }
        title="Delete Doctor"
        description="Are you sure you want to delete this doctor? This action cannot be undone."
      />

      <AddCashierModal
        isOpen={isAddCashierModalOpen || editingCashier !== null}
        onClose={() => {
          setIsAddCashierModalOpen(false);
          setEditingCashier(null);
        }}
        onAdd={createCashierMutation.mutate}
        editingCashier={editingCashier}
        onUpdate={updateCashierMutation.mutate}
      />
      <DeleteConfirmModal
        isOpen={deleteCashierId !== null}
        onClose={() => setDeleteCashierId(null)}
        onConfirm={() =>
          deleteCashierId && deleteCashierMutation.mutate(deleteCashierId)
        }
        title="Delete Cashier"
        description="Are you sure you want to delete this cashier? This action cannot be undone."
      />

      <AddLabStaffModal
        isOpen={isAddLabStaffModalOpen || editingLabStaff !== null}
        onClose={() => {
          setIsAddLabStaffModalOpen(false);
          setEditingLabStaff(null);
        }}
        onAdd={createLabStaffMutation.mutate}
        editingLabStaff={editingLabStaff}
        onUpdate={updateLabStaffMutation.mutate}
      />
      <DeleteConfirmModal
        isOpen={deleteLabStaffId !== null}
        onClose={() => setDeleteLabStaffId(null)}
        onConfirm={() =>
          deleteLabStaffId && deleteLabStaffMutation.mutate(deleteLabStaffId)
        }
        title="Delete Lab Staff"
        description="Are you sure you want to delete this labStaff? This action cannot be undone."
      />

      <AddServiceFeeModal
        isOpen={isAddServiceFeeModalOpen || editingServiceFee !== null}
        onClose={() => {
          setIsAddServiceFeeModalOpen(false);
          setEditingServiceFee(null);
        }}
        onAdd={createServiceFeeMutation.mutate}
        editingServiceFee={editingServiceFee}
        onUpdate={updateServiceFeeMutation.mutate}
      />
      <DeleteConfirmModal
        isOpen={deleteServiceFeeId !== null}
        onClose={() => setDeleteServiceFeeId(null)}
        onConfirm={() =>
          deleteServiceFeeId &&
          deleteServiceFeeMutation.mutate(deleteServiceFeeId)
        }
        title="Delete Service Fee"
        description="Are you sure you want to delete this serviceFee? This action cannot be undone."
      />

      <AddDepartmentModal
        isOpen={isAddDepartmentModalOpen || editingDepartment !== null}
        onClose={() => {
          setIsAddDepartmentModalOpen(false);
          setEditingDepartment(null);
        }}
        onAdd={createDepartmentMutation.mutate}
        editingDepartment={editingDepartment}
        onUpdate={updateDepartmentMutation.mutate}
      />
      <DeleteConfirmModal
        isOpen={deleteDepartmentId !== null}
        onClose={() => setDeleteDepartmentId(null)}
        onConfirm={() =>
          deleteDepartmentId &&
          deleteDepartmentMutation.mutate(deleteDepartmentId)
        }
        title="Delete Service Fee"
        description="Are you sure you want to delete this department? This action cannot be undone."
      />
    </div>
  );
}
