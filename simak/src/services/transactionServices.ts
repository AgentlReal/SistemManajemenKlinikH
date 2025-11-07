import type { Transaction } from "@/types";
import apiFetch from "@/lib/api";

export const fetchAllTransactionsAPI = async (): Promise<Transaction[]> => {
  const response = await apiFetch("/transaksi-pembayaran");
  return response.data as Transaction[];
};
