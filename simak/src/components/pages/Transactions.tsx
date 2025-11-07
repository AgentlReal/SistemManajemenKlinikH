import { fetchAllTransactionsAPI } from "@/services/transactionServices";
import type { Transaction, TransactionStatus } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { DollarSign, Plus, Printer } from "lucide-react";
import { printReceiptPDF } from "../shared/PrintReceipt";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DataTable } from "../ui/data-table";

const transformTransactionFromAPI = (transaction: any): Transaction => ({
  id: transaction.id_pembayaran.toString(),
  transactionId: `TRX-2025-${transaction.id_pembayaran.toString().padStart(3, "0")}`,
  patientName: "Unknown", // Patient info not available in this endpoint
  date: transaction.tanggal_transaksi,
  items: [], // Items not available in this endpoint
  total: transaction.jumlah_total,
  status: transaction.status_pembayaran === "Lunas" ? "paid" : "unpaid",
  paymentMethod: transaction.metode_pembayaran,
});

const statusConfig: Record<
  TransactionStatus,
  { label: string; color: string }
> = {
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-700 hover:bg-green-200",
  },
  unpaid: {
    label: "Unpaid",
    color: "bg-red-100 text-red-700 hover:bg-red-200",
  },
};

export function Transactions() {
  const queryClient = useQueryClient();

  const {
    data: transactions,
    isLoading,
    isRefetching,
    error,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const data = await fetchAllTransactionsAPI();
      return data.map(transformTransactionFromAPI);
    },
  });

  const totalRevenue = transactions
    ? transactions
        .filter((t) => t.status === "paid")
        .reduce((sum, t) => sum + t.total, 0)
    : 0;
  const pendingPayments = transactions
    ? transactions
        .filter((t) => t.status === "unpaid")
        .reduce((sum, t) => sum + t.total, 0)
    : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: () => (
        <p className="text-center font-semibold text-md">ID Transaksi</p>
      ),
      cell: ({ getValue }) => (
        <p className="text-center text-md">{getValue() as string}</p>
      ),
    },
    {
      accessorKey: "patientName",
      header: "Nama Pasien",
    },
    {
      accessorKey: "date",
      header: "Tanggal",
    },
    {
      accessorKey: "items",
      header: "Layanan",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "paymentMethod",
      header: "Metode Pembayaran",
    },
    {
      accessorKey: "status",
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
      cell: () => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            title="Tambah Biaya"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => printReceiptPDF()}
            title="Print Transaksi"
          >
            <Printer className="w-4 h-4" />
          </Button>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Pendapatan
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
                <p className="text-xs text-red-600 mt-2">Menunggu Pembayaran</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            title="transaksi"
            isLoading={isLoading}
            isRefetching={isRefetching}
            error={error}
            onRefresh={() =>
              queryClient.invalidateQueries({ queryKey: ["transactions"] })
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
