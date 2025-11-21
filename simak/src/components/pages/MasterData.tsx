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
  createScheduleAPI,
  deleteScheduleAPI,
  fetchAllSchedulesAPI,
  updateScheduleAPI,
} from "@/services/scheduleServices";
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
  ViewDoctor,
  ViewSchedule,
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
  UserRoundPlus,
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
import { AddScheduleModal } from "../modals/AddScheduleModal";
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
  const [editingDoctor, setEditingDoctor] = useState<
    (Omit<ViewDoctor, "tanggal_lahir"> & { tanggal_lahir: Date }) | null
  >(null);

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
  const [deleteServiceFeeId, setDeleteServiceFeeId] = useState<number | null>(
    null
  );
  const [editingServiceFee, setEditingServiceFee] = useState<ServiceFee | null>(
    null
  );

  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] =
    useState(false);
  useState<Department | null>(null);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState<number | null>(
    null
  );
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  useState<Department | null>(null);
  const [deleteScheduleId, setDeleteScheduleId] = useState<number | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

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
    Omit<Receptionist, "id_resepsionis">
  >({
    mutationFn: async (newReceptionist) => {
      await createReceptionistAPI(newReceptionist);
      toast.success("Resepsionis berhasil ditambahkan!");
      return {} as Receptionist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
    onError: () => {
      toast.error("Resepsionis gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
  });
  const deleteReceptionistMutation = useMutation<Receptionist, Error, string>({
    mutationFn: async (id) => {
      await deleteReceptionistAPI(id);
      toast.success("Resepsionis berhasil dihapus!");
      setDeleteReceptionistId(null);
      return {} as Receptionist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
    onError: () => {
      toast.error("Resepsionis gagal dihapus!");
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
      toast.success("Resepsionis berhasil diperbarui!");
      setEditingReceptionist(null);
      return {} as Receptionist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
    onError: () => {
      toast.error("Resepsionis gagal diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
  });

  //Doctor Query and Mutations
  const doctorQuery = useQuery<
    (Omit<ViewDoctor, "tanggal_lahir"> & { tanggal_lahir: Date })[]
  >({
    queryKey: ["doctors"],
    queryFn: () => fetchAllDoctorsAPI(),
  });

  const createDoctorMutation = useMutation<
    Doctor,
    Error,
    Omit<Doctor, "id_dokter">
  >({
    mutationFn: async (newDoctor) => {
      await createDoctorAPI(newDoctor);
      toast.success("Dokter berhasil ditambahkan!");
      return {} as Doctor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => {
      toast.error("Dokter gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
  const deleteDoctorMutation = useMutation<Doctor, Error, string>({
    mutationFn: async (id) => {
      await deleteDoctorAPI(id);
      toast.success("Dokter berhasil dihapus!");
      setDeleteDoctorId(null);
      return {} as Doctor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => {
      toast.error("Dokter gagal dihapus!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
  const updateDoctorMutation = useMutation<Doctor, Error, Doctor>({
    mutationFn: async (updatedQueue) => {
      await updateDoctorAPI(updatedQueue);
      toast.success("Dokter berhasil diperbarui!");
      setEditingDoctor(null);
      return {} as Doctor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => {
      toast.error("Dokter gagal diperbarui!");
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
    Omit<Cashier, "id_kasir">
  >({
    mutationFn: async (newCashier) => {
      await createCashierAPI(newCashier);
      toast.success("Kasir berhasil ditambahkan!");
      return {} as Cashier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
    onError: () => {
      toast.error("Kasir gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
  });
  const deleteCashierMutation = useMutation<Cashier, Error, string>({
    mutationFn: async (id) => {
      await deleteCashierAPI(id);
      toast.success("Kasir berhasil dihapus!");
      setDeleteCashierId(null);
      return {} as Cashier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
    onError: () => {
      toast.error("Kasir gagal dihapus!");
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
  });
  const updateCashierMutation = useMutation<Cashier, Error, Cashier>({
    mutationFn: async (updatedQueue) => {
      await updateCashierAPI(updatedQueue);
      toast.success("Kasir berhasil diperbarui!");
      setEditingCashier(null);
      return {} as Cashier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashiers"] });
    },
    onError: () => {
      toast.error("Kasir gagal diperbarui!");
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
    Omit<LabStaff, "id_staf_lab">
  >({
    mutationFn: async (newLabStaff) => {
      await createLabStaffAPI(newLabStaff);
      toast.success("Staf Lab berhasil ditambahkan!");
      return {} as LabStaff;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
    onError: () => {
      toast.error("Staf Lab gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
  });
  const deleteLabStaffMutation = useMutation<LabStaff, Error, string>({
    mutationFn: async (id) => {
      await deleteLabStaffAPI(id);
      toast.success("Staf Lab berhasil dihapus!");
      setDeleteLabStaffId(null);
      return {} as LabStaff;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
    onError: () => {
      toast.error("Staf Lab gagal dihapus!");
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
  });
  const updateLabStaffMutation = useMutation<LabStaff, Error, LabStaff>({
    mutationFn: async (updatedQueue) => {
      await updateLabStaffAPI(updatedQueue);
      toast.success("Staf Lab berhasil diperbarui!");
      setEditingLabStaff(null);
      return {} as LabStaff;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labStaffs"] });
    },
    onError: () => {
      toast.error("Staf Lab gagal diperbarui!");
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
    Omit<ServiceFee, "id_tarif_layanan">
  >({
    mutationFn: async (newServiceFee) => {
      await createServiceFeeAPI(newServiceFee);
      toast.success("Tarif Layanan berhasil ditambahkan!");
      return {} as ServiceFee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
    onError: () => {
      toast.error("Tarif Layanan gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
  });
  const deleteServiceFeeMutation = useMutation<ServiceFee, Error, number>({
    mutationFn: async (id) => {
      await deleteServiceFeeAPI(id);
      toast.success("Tarif Layanan berhasil dihapus!");
      setDeleteServiceFeeId(null);
      return {} as ServiceFee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
    onError: () => {
      toast.error("Tarif Layanan gagal dihapus!");
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
  });
  const updateServiceFeeMutation = useMutation<ServiceFee, Error, ServiceFee>({
    mutationFn: async (updatedQueue) => {
      await updateServiceFeeAPI(updatedQueue);
      toast.success("Tarif Layanan berhasil diperbarui!");
      setEditingServiceFee(null);
      return {} as ServiceFee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFees"] });
    },
    onError: () => {
      toast.error("Tarif Layanan gagal diperbarui!");
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
    Omit<Department, "id_poli">
  >({
    mutationFn: async (newDepartment) => {
      await createDepartmentAPI(newDepartment);
      toast.success("Poli berhasil ditambahkan!");
      return {} as Department;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => {
      toast.error("Poli gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
  const deleteDepartmentMutation = useMutation<Department, Error, number>({
    mutationFn: async (id) => {
      await deleteDepartmentAPI(id);
      toast.success("Poli berhasil dihapus!");
      setDeleteDepartmentId(null);
      return {} as Department;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => {
      toast.error("Poli gagal dihapus!");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
  const updateDepartmentMutation = useMutation<Department, Error, Department>({
    mutationFn: async (updatedQueue) => {
      await updateDepartmentAPI(updatedQueue);
      toast.success("Poli berhasil diperbarui!");
      setEditingDepartment(null);
      return {} as Department;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: () => {
      toast.error("Poli gagal diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  //Schedules Query and Mutations
  const scheduleQuery = useQuery<ViewSchedule[]>({
    queryKey: ["schedules"],
    queryFn: () => fetchAllSchedulesAPI(),
  });

  const createScheduleMutation = useMutation<
    Schedule,
    Error,
    Omit<Schedule, "id_jadwal">
  >({
    mutationFn: async (newSchedule) => {
      await createScheduleAPI(newSchedule);
      toast.success("Jadwal berhasil ditambahkan!");
      return {} as Schedule;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => {
      toast.error("Jadwal gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
  const deleteScheduleMutation = useMutation<Schedule, Error, number>({
    mutationFn: async (id) => {
      await deleteScheduleAPI(id);
      toast.success("Jadwal berhasil dihapus!");
      setDeleteScheduleId(null);
      return {} as Schedule;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => {
      toast.error("Jadwal gagal dihapus!");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
  const updateScheduleMutation = useMutation<Schedule, Error, Schedule>({
    mutationFn: async (updatedQueue) => {
      await updateScheduleAPI(updatedQueue);
      toast.success("Jadwal berhasil diperbarui!");
      setEditingSchedule(null);
      return {} as Schedule;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => {
      toast.error("Jadwal gagal diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  const receptionistColumns: ColumnDef<Receptionist>[] = [
    {
      accessorKey: "id_resepsionis",
      header: "ID",
    },
    {
      accessorKey: "nama",
      header: "Nama",
    },
    {
      accessorKey: "jenis_kelamin",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "nomor_telepon",
      header: "No Telp",
    },
    {
      accessorKey: "gaji",
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
            onClick={() => {}}
            title="Tambah Akun"
          >
            <UserRoundPlus className="w-4 h-4" />
          </Button>
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
            onClick={() => setDeleteReceptionistId(row.original.id_resepsionis)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const doctorColumns: ColumnDef<
    Omit<ViewDoctor, "tanggal_lahir"> & { tanggal_lahir: Date }
  >[] = [
    {
      accessorKey: "id_dokter",
      header: "ID",
    },
    {
      accessorKey: "nama_dokter",
      header: "Nama",
    },
    {
      accessorKey: "jenis_kelamin",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "nomor_telepon",
      header: "No Telp",
    },
    {
      accessorKey: "nama_poli",
      header: "Poli",
    },
    {
      accessorKey: "gaji",
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
            onClick={() =>
              setEditingDoctor({
                id_dokter: row.original.id_dokter,
                id_poli: row.original.id_poli,
                alamat: row.original.alamat,
                gaji: row.original.gaji,
                jenis_kelamin: row.original.jenis_kelamin,
                nama_dokter: row.original.nama_dokter,
                nama_poli: "apalah",
                nomor_lisensi: row.original.nomor_lisensi,
                nomor_telepon: row.original.nomor_telepon,
                spesialis: row.original.spesialis,
                tanggal_lahir: row.original.tanggal_lahir,
              })
            }
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteDoctorId(row.original.id_dokter)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const cashierColumns: ColumnDef<Cashier>[] = [
    {
      accessorKey: "id_kasir",
      header: "ID",
    },
    {
      accessorKey: "nama",
      header: "Nama",
    },
    {
      accessorKey: "jenis_kelamin",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "nomor_telepon",
      header: "No Telp",
    },
    {
      accessorKey: "gaji",
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
            onClick={() => setDeleteCashierId(row.original.id_kasir)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const labStaffColumns: ColumnDef<LabStaff>[] = [
    {
      accessorKey: "id_staf_lab",
      header: "ID",
    },
    {
      accessorKey: "nama",
      header: "Nama",
    },
    {
      accessorKey: "jenis_kelamin",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "nomor_telepon",
      header: "No Telp",
    },
    {
      accessorKey: "gaji",
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
            onClick={() => setDeleteLabStaffId(row.original.id_staf_lab)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
  const serviceFeeColumns: ColumnDef<ServiceFee>[] = [
    {
      accessorKey: "id_tarif_layanan",
      header: "ID",
    },
    {
      accessorKey: "nama_layanan",
      header: "Nama Layanan",
    },
    {
      accessorKey: "tipe_layanan",
      header: "Kategori",
    },
    {
      accessorKey: "Harga",
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
            onClick={() => setDeleteServiceFeeId(row.original.id_tarif_layanan)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
  const departmentColumns: ColumnDef<Department>[] = [
    {
      accessorKey: "id_poli",
      header: "ID",
    },
    {
      accessorKey: "nama_poli",
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
            onClick={() => setDeleteDepartmentId(row.original.id_poli)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
  const scheduleColumns: ColumnDef<ViewSchedule>[] = [
    {
      accessorKey: "id_jadwal",
      header: "ID",
    },
    {
      accessorKey: "id_karyawan",
      header: "ID Karyawan",
    },
    {
      accessorKey: "nama_karyawan",
      header: "Nama Karyawan",
    },
    {
      accessorKey: "jam_mulai",
      header: "Jam Mulai",
    },
    {
      accessorKey: "jam_selesai",
      header: "Jam Selesai",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingSchedule({
                id_jadwal: row.original.id_jadwal,
                id_resepsionis:
                  row.original.id_karyawan[0] === "R"
                    ? row.original.id_karyawan
                    : "",
                id_dokter:
                  row.original.id_karyawan[0] === "D"
                    ? row.original.id_karyawan
                    : "",
                id_staf_lab:
                  row.original.id_karyawan[0] === "L"
                    ? row.original.id_karyawan
                    : "",
                id_kasir:
                  row.original.id_karyawan[0] === "K"
                    ? row.original.id_karyawan
                    : "",
                jam_mulai: row.original.jam_mulai,
                jam_selesai: row.original.jam_selesai,
              });
            }}
          >
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
                data={scheduleQuery.data}
                columns={scheduleColumns}
                title="jadwal karyawan"
                onAdd={() => {
                  setIsAddScheduleModalOpen(true);
                }}
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
        title="Hapus Resepsionis"
        description="Apa Anda yakin ingin menghapus resepsionis ini?"
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
        title="Hapus Dokter"
        description="Apa Anda yakin ingin menghapus dokter ini?"
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
        title="Hapus Kasir"
        description="Apa Anda yakin ingin menghapus kasir ini?"
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
        title="Hapus Staf Lab"
        description="Apa Anda yakin ingin menghapus staf lab ini?"
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
        title="Hapus Tarif Layanan"
        description="Apa Anda yakin ingin menghapus tarif layanan ini?"
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
        title="Hapus Poli"
        description="Apa Anda yakin ingin menghapus poli ini?"
      />
      <DeleteConfirmModal
        isOpen={deleteDepartmentId !== null}
        onClose={() => setDeleteDepartmentId(null)}
        onConfirm={() =>
          deleteDepartmentId &&
          deleteDepartmentMutation.mutate(deleteDepartmentId)
        }
        title="Hapus Poli"
        description="Apa Anda yakin ingin menghapus poli ini?"
      />
      <AddScheduleModal
        isOpen={isAddScheduleModalOpen || editingSchedule !== null}
        onClose={() => {
          setIsAddScheduleModalOpen(false);
          setEditingSchedule(null);
        }}
        onAdd={createScheduleMutation.mutate}
        editingSchedule={editingSchedule}
        onUpdate={updateScheduleMutation.mutate}
      />
      <DeleteConfirmModal
        isOpen={deleteScheduleId !== null}
        onClose={() => setDeleteScheduleId(null)}
        onConfirm={() =>
          deleteScheduleId && deleteScheduleMutation.mutate(deleteScheduleId)
        }
        title="Hapus Jadwal"
        description="Apa Anda yakin ingin menghapus jadwal ini?"
      />
    </div>
  );
}
