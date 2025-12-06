import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { fetchAllDoctorRecipesAPI } from "@/services/doctorRecipeServices";
import {
  fetchAllTransactionsAPI,
  updateTransactionAPI,
} from "@/services/transactionServices";
import type {
  Transaction,
  TransactionStatus,
  ViewDoctorRecipe,
  ViewTransactionClient,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, Printer } from "lucide-react";
import { useState } from "react";
import { BsBank, BsCash } from "react-icons/bs";
import { TfiPrinter } from "react-icons/tfi";
import { toast } from "sonner";
import { AddServiceToTransactionModal } from "../modals/AddServiceToTransactionModal";
import { ProcessTransactionModal } from "../modals/ProcessTransactionModal";
import { printReceiptPDF } from "../shared/PrintReceipt";
import { Badge, badgeVariants } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DataTable } from "../ui/data-table";
const statusConfig: Record<
  TransactionStatus,
  { label: string; color: string }
> = {
  Lunas: {
    label: "Lunas",
    color: "bg-green-100 text-green-700 hover:bg-green-200",
  },
  "Belum Lunas": {
    label: "Belum Lunas",
    color: "bg-red-100 text-red-700 hover:bg-red-200",
  },
};

export function Transactions() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ViewTransactionClient | null>(null);

  const { user } = useAuth();

  const {
    data: transactions = [],
    isLoading,
    isRefetching,
    error,
  } = useQuery<ViewTransactionClient[]>({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactionsAPI,
  });

  const updateTransactionMutation = useMutation<
    ViewTransactionClient,
    Error,
    Transaction
  >({
    mutationFn: async (updatedTransaction) => {
      console.log(updatedTransaction);

      await updateTransactionAPI(updatedTransaction);
      toast.success("Transaksi Berhasil Diproses!");
      return {} as ViewTransactionClient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Transaksi Gagal Diproses!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const { data: doctorRecipes = [] } = useQuery<ViewDoctorRecipe[]>({
    queryKey: ["recipes"],
    queryFn: () => fetchAllDoctorRecipesAPI(),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns: ColumnDef<ViewTransactionClient>[] = [
    {
      accessorKey: "id_pembayaran",
      header: () => (
        <p className="text-center font-semibold text-md">ID Transaksi</p>
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
      accessorKey: "tanggal_transaksi",
      header: "Tanggal",
      cell: ({ getValue }) => (getValue() as Date).toLocaleDateString("id-ID"),
    },
    {
      accessorKey: "jumlah_total",
      header: "Total",
      cell: ({ getValue }) => formatCurrency(getValue() as number),
    },
    {
      id: "method",
      accessorKey: "metode_pembayaran",
      header: "Metode Pembayaran",
      cell: ({ getValue }) => {
        const item = getValue() as string;
        return (
          <Badge
            className={
              item === "Transfer bank"
                ? `bg-blue-100 text-blue-700 hover:bg-blue-200`
                : item === "Tunai"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }
          >
            {item === "Transfer bank" ? (
              <BsBank />
            ) : (
              item === "Tunai" && <BsCash />
            )}
            {item}
          </Badge>
        );
      },
    },
    {
      id: "status",
      accessorKey: "status_pembayaran",
      header: "Status",
      cell: ({ getValue }) => {
        const item = getValue() as TransactionStatus;
        return (
          <Badge className={statusConfig[item].color}>
            {statusConfig[item].label}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          {row.original.status_pembayaran === "Belum Lunas" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedTransaction(() => row.original);
                setIsAddModalOpen(() => true);
              }}
              title="Tambah Biaya"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
          {row.original.status_pembayaran === "Belum Lunas" &&
            user?.role === "cashier" && (
              <div
                className={cn(
                  badgeVariants({ variant: "default" }),
                  "bg-green-600 text-green-100 hover:bg-green-500 hover:cursor-pointer"
                )}
                onClick={() => {
                  setSelectedTransaction(() => row.original);
                  setIsProcessModalOpen(() => true);
                }}
                title="Proses Transaksi"
              >
                Proses
              </div>
            )}

          {row.original.status_pembayaran === "Lunas" &&
            user?.role === "cashier" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => printReceiptPDF(row.original)}
                title={
                  doctorRecipes.filter(
                    (d) => d.id_pembayaran === row.original.id_pembayaran
                  ).length !== 0
                    ? `Print Transaksi dan Resep Dokter`
                    : `Print Transaksi`
                }
              >
                {doctorRecipes.filter(
                  (d) => d.id_pembayaran === row.original.id_pembayaran
                ).length !== 0 ? (
                  <TfiPrinter />
                ) : (
                  <Printer className="w-4 h-4" />
                )}
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
          <h1>Kelola Transaksi</h1>
          <p className="text-muted-foreground mt-1">
            Lihat dan kelola transaksi
          </p>
        </div>
        {/* <Button className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button> */}
      </div>

      {/* Revenue Stats */}
      {/* {!["doctor", "lab"].includes(user?.role || "") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Pendapatan Hari Ini
                  </p>
                  <h2 className="mt-2">{formatCurrency(totalRevenue)}</h2>
                  <p className="text-xs text-green-600 mt-2">
                    Transaksi sudah dibayar
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pembayaran Ditunda
                  </p>
                  <h2 className="mt-2">{formatCurrency(pendingPayments)}</h2>
                  <p className="text-xs text-red-600 mt-2">
                    Menunggu Pembayaran
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )} */}
      <Card>
        <CardContent>
          <DataTable
            columns={
              ["doctor", "lab"].includes(user?.role || "")
                ? columns.filter((c) => c.id !== "method" && c.id !== "status")
                : columns
            }
            data={
              ["doctor", "lab"].includes(user?.role || "")
                ? transactions.filter(
                    (t) => t.status_pembayaran === "Belum Lunas"
                  )
                : transactions
            }
            title="transaksi"
            isLoading={isLoading}
            isRefetching={isRefetching}
            error={error}
            onRefresh={() =>
              queryClient.invalidateQueries({ queryKey: ["transactions"] })
            }
            filterColumnId="status"
            filterPlaceholder="Filter dengan Status..."
            filterOptions={["Lunas", "Belum Lunas"]}
          />
        </CardContent>
      </Card>
      {selectedTransaction && (
        <AddServiceToTransactionModal
          transaction={selectedTransaction}
          isOpen={!!selectedTransaction && isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(() => false);
            setSelectedTransaction(() => null);
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
          }}
        />
      )}
      {selectedTransaction && (
        <ProcessTransactionModal
          onProcess={updateTransactionMutation.mutate}
          isOpen={!!selectedTransaction && isProcessModalOpen}
          transaction={selectedTransaction}
          onClose={() => {
            setIsProcessModalOpen(() => false);
            setSelectedTransaction(() => null);
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
          }}
        />
      )}
    </div>
  );
}
