import {
  createPatientAPI,
  deletePatientAPI,
  fetchAllPatientsAPI,
  updatePatientAPI,
} from "@/services/patientServices";
import type { Patient, Role } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { AgeFromDate } from "age-calculator";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AddPatientModal } from "../modals/AddPatientModal";
import { DeleteConfirmModal } from "../modals/DeleteConfirmModal";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DataTable } from "../ui/data-table";

interface AuthorizedRoles {
  create: Role[];
  read: Role[];
  update: Role[];
  delete: Role[];
}

const authorizedRoles: AuthorizedRoles = {
  create: ["admin", "receptionist"],
  read: ["admin", "doctor", "lab"],
  update: ["admin", "receptionist"],
  delete: ["admin", "receptionist"],
};

export function ManagePatients() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState<string | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: patients,
    isLoading,
    isRefetching,
    error,
  } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: () => fetchAllPatientsAPI(),
  });

  const createPatientMutation = useMutation<
    Patient,
    Error,
    Omit<Patient, "id">
  >({
    mutationFn: async (newPatient) => {
      await createPatientAPI(newPatient);
      toast.success("Pasien berhasil ditambahkan!");
      return {} as Patient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: () => {
      toast.error("Pasien gagal ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
  const deletePatientMutation = useMutation<Patient, Error, string>({
    mutationFn: async (id) => {
      await deletePatientAPI(id);
      toast.success("Pasien berhasil dihapus!");
      setDeletePatientId(null);
      return {} as Patient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: () => {
      toast.error("Pasien gagal dihapus!");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
  const updatePatientMutation = useMutation<Patient, Error, Patient>({
    mutationFn: async (updatedPatient) => {
      await updatePatientAPI(updatedPatient);
      toast.success("Pasien berhasil diperbarui!");
      setEditingPatient(null);
      return {} as Patient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: () => {
      toast.error("Pasien gagal diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const allColumns: ColumnDef<Patient>[] = [
    {
      accessorKey: "nik",
      header: "NIK",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "birthDate",
      header: "Umur",
      cell: ({ getValue }) => new AgeFromDate(getValue() as Date).age,
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "address",
      header: "Alamat",
    },
    {
      id: "actions",
      header: () => <div className="text-right mr-4">Aksi</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingPatient(row.original)}
            title="View Details"
          >
            {user && authorizedRoles.update.includes(user.role) ? (
              <Edit className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
          {user && authorizedRoles.delete.includes(user.role) && (
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => setDeletePatientId(row.original.id)}
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Kelola Pasien</h1>
          <p className="text-muted-foreground mt-1">
            Lihat dan kelola data pasien
          </p>
        </div>
        {/* <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button> */}
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={allColumns}
            data={patients}
            title="pasien"
            isLoading={isLoading}
            isRefetching={isRefetching}
            error={error}
            onAdd={
              user && authorizedRoles.create.includes(user.role)
                ? () => setIsAddModalOpen(true)
                : undefined
            }
            onRefresh={() =>
              queryClient.invalidateQueries({ queryKey: ["patients"] })
            }
          />
        </CardContent>
      </Card>

      <AddPatientModal
        isOpen={isAddModalOpen || editingPatient !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingPatient(null);
        }}
        onAdd={createPatientMutation.mutate}
        editingPatient={editingPatient}
        onUpdate={updatePatientMutation.mutate}
        onlyRead={
          !!user &&
          (!authorizedRoles.create.includes(user.role) ||
            !authorizedRoles.update.includes(user.role))
        }
      />

      <DeleteConfirmModal
        isOpen={deletePatientId !== null}
        onClose={() => setDeletePatientId(null)}
        onConfirm={() =>
          deletePatientId && deletePatientMutation.mutate(deletePatientId)
        }
        title="Delete Patient"
        description="Are you sure you want to delete this patient? This action cannot be undone."
      />
    </div>
  );
}
