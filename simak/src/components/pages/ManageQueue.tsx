import {
  createQueueAPI,
  deleteQueueAPI,
  fetchAllQueuesAPI,
  updateQueueAPI,
} from "@/services/queueServices";
import type {
  BackendQueuePayload,
  BackendQueueResponse,
  QueueStatus,
} from "@/types";
import startcase from "@stdlib/string-startcase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { Clock, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AddQueueModal } from "../modals/AddQueueModal";
import { DeleteConfirmModal } from "../modals/DeleteConfirmModal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DataTable } from "../ui/data-table";

interface StatusConfig {
  label: string;
  color: string;
}

const statusConfig: Record<QueueStatus, StatusConfig> = {
  Menunggu: {
    label: "Menunggu",
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  },
  Berlangsung: {
    label: "Berlangsung",
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  Selesai: {
    label: "Selesai",
    color: "bg-green-100 text-green-700 hover:bg-green-200",
  },
};

export function ManageQueue() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteQueueId, setDeleteQueueId] = useState<number | null>(null);
  const [editingQueue, setEditingQueue] = useState<BackendQueuePayload | null>(
    null
  );
  const queryClient = useQueryClient();

  const {
    data: queue,
    isLoading,
    isRefetching,
    error,
  } = useQuery<BackendQueueResponse[]>({
    queryKey: ["queues"],
    queryFn: () => fetchAllQueuesAPI(),
  });

  const createQueueMutation = useMutation<
    BackendQueueResponse,
    Error,
    Omit<BackendQueuePayload, "id_antrian">
  >({
    mutationFn: async (newQueuePayload) => {
      await createQueueAPI(newQueuePayload);
      toast.success("Queue entry added successfully!");
      return {} as BackendQueueResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
    onError: () => {
      toast.error("Query entry failed to create!");
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
  });
  const deleteQueueMutation = useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await deleteQueueAPI(id);
      toast.success("Queue entry deleted successfully!");
      setDeleteQueueId(null);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
    onError: () => {
      toast.error("Query entry failed to delete!");
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
  });
  const updateQueueMutation = useMutation<
    undefined,
    Error,
    BackendQueuePayload
  >({
    mutationFn: async (payload) => {
      await updateQueueAPI(payload);
      toast.success("Queue entry updated successfully!");
      setEditingQueue(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
    onError: () => {
      toast.error("Query entry failed to update!");
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
  });

  const columns: ColumnDef<BackendQueueResponse>[] = [
    {
      accessorKey: "nomor_antrian",
      header: () => (
        <p className="text-center font-semibold text-md">No Antrian</p>
      ),
      cell: ({ getValue }) => (
        <p className="text-center text-md">{getValue() as string}</p>
      ),
    },
    {
      accessorKey: "nama_pasien",
      header: "Nama Pasien",
    },
    {
      accessorKey: "poli",
      header: "Poli",
      cell: ({ getValue }) => startcase(getValue() as string),
    },
    {
      accessorKey: "nama_dokter",
      header: "Nama Dokter",
    },
    {
      accessorKey: "tanggal",
      header: "Waktu",
    },
    {
      accessorKey: "keterangan",
      header: "Status",
      cell: ({ getValue }) => {
        const item = getValue() as QueueStatus;

        return (
          <Badge className={statusConfig[item]?.color}>
            {statusConfig[item]?.label}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right mr-4">Aksi</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setEditingQueue({
                id_antrian: row.original.id_antrian,
                id_dokter: row.original.id_dokter,
                id_pasien: row.original.id_pasien,
                id_resepsionis: "R001",
                keluhan: row.original.keluhan,
                keterangan: row.original.keterangan,
              })
            }
            title="Edit"
            className="hover:cursor-pointer"
          >
            <Edit className="w-4 h-4" />
          </Button>
          {/* <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:cursor-pointer"
            onClick={() => setDeleteQueueId(row.original.id_antrian)}
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button> */}
        </div>
      ),
    },
  ];

  const waitingCount = queue
    ? queue.filter((item) => item.keterangan === "Menunggu").length
    : 0;
  const inProgressCount = queue
    ? queue.filter((item) => item.keterangan === "Berlangsung").length
    : 0;
  const completedCount = queue
    ? queue.filter((item) => item.keterangan === "Selesai").length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Kelola Antrian</h1>
          <p className="text-muted-foreground mt-1">Lihat dan kelola antrian</p>
        </div>
        {/* <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Queue
        </Button> */}
      </div>
      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Menunggu</p>
                <h2 className="mt-2">{waitingCount}</h2>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Berlangsung</p>
                <h2 className="mt-2">{inProgressCount}</h2>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Selesai</p>
                <h2 className="mt-2">{completedCount}</h2>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <DataTable
            isLoading={isLoading}
            isRefetching={isRefetching}
            error={error}
            columns={columns}
            data={queue}
            title="antrian"
            onAdd={() => setIsAddModalOpen(true)}
            onRefresh={() =>
              queryClient.invalidateQueries({ queryKey: ["queues"] })
            }
            filterColumnId="keterangan"
            filterPlaceholder="Filter dengan Status..."
            filterOptions={["Menunggu", "Berlangsung", "Selesai"]}
          />
        </CardContent>
      </Card>
      <AddQueueModal
        isOpen={isAddModalOpen || editingQueue !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingQueue(null);
        }}
        onAdd={createQueueMutation.mutate}
        onUpdate={updateQueueMutation.mutate}
        editingQueue={editingQueue}
      />
      <DeleteConfirmModal
        isOpen={deleteQueueId !== null}
        onClose={() => setDeleteQueueId(null)}
        onConfirm={() =>
          deleteQueueId && deleteQueueMutation.mutate(deleteQueueId)
        }
        title="Delete Queue Entry"
        description="Are you sure you want to remove this entry from the queue?"
      />
    </div>
  );
}
