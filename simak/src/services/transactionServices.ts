import apiFetch from "@/lib/api";
import type { ViewTransactionAPI, ViewTransactionClient } from "@/types";

const transformTransactionToAPI = (
  transaction: Omit<ViewTransactionClient, "id_staf_lab">
) => ({
  ...transaction,
  tanggal_transaksi: transaction.tanggal_transaksi.toISOString().split("T")[0],
});

const transformTransactionFromAPI = (
  transaction: ViewTransactionAPI
): ViewTransactionClient => ({
  ...transaction,
  jumlah_total: Number(transaction.jumlah_total),
  tanggal_transaksi: new Date(transaction.tanggal_transaksi),
});

export const fetchAllTransactionsAPI = async (): Promise<
  ViewTransactionClient[]
> => {
  const response = await apiFetch("/transaksi-pembayaran-lengkap");
  return response.data.map(
    transformTransactionFromAPI
  ) as ViewTransactionClient[];
};
