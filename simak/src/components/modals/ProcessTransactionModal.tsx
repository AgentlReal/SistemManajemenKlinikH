import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllServicesAPI } from "@/services/serviceServices";
import type { Transaction, ViewService, ViewTransactionClient } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BsBank, BsCash } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ProcessTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: ViewTransactionClient;
  onProcess: (t: Transaction) => void;
}

export function ProcessTransactionModal({
  isOpen,
  onClose,
  transaction,
  onProcess,
}: ProcessTransactionModalProps) {
  const { data: cart = [], isLoading } = useQuery<ViewService[]>({
    queryKey: ["servicesInTransaction", transaction.id_pembayaran],
    queryFn: () => fetchAllServicesAPI(transaction.id_pembayaran),
  });

  const total = cart.reduce(
    (acc, item) => acc + item.harga_saat_itu * item.kuantitas,
    0
  );

  const [currentTransaction, setCurrentTransaction] = useState({
    ...transaction,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Tambah Layanan ke Transaksi</DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-1">
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Layanan Ditambahkan</h3>
          </div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : cart.length > 0 ? (
            <div>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Layanan</TableHead>
                      <TableHead className="text-center">Jumlah</TableHead>
                      <TableHead className="text-right">Harga Satuan</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id_tarif_layanan}>
                        <TableCell>{item.nama_layanan}</TableCell>
                        <TableCell className="text-center">
                          {item.kuantitas}
                        </TableCell>
                        <TableCell className="text-right">
                          Rp {item.harga_saat_itu.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell className="text-right">
                          Rp{" "}
                          {(
                            item.harga_saat_itu * item.kuantitas
                          ).toLocaleString("id-ID")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end mt-4">
                <div className="text-right">
                  <p className="text-muted-foreground">Total Keseluruhan</p>
                  <p className="text-2xl font-bold">
                    Rp {total.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">Metode Pembayaran</h3>
              <Select
                onValueChange={(v) => {
                  setCurrentTransaction((o) => ({
                    ...o,
                    metode_pembayaran: v,
                  }));
                }}
                defaultValue={
                  currentTransaction.metode_pembayaran === "Belum Dipilih"
                    ? ""
                    : currentTransaction.metode_pembayaran
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Metode Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tunai">
                    <BsCash /> Tunai
                  </SelectItem>
                  <SelectItem value="Transfer bank">
                    <BsBank /> Transfer bank
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            "Belum ada layanan yang ditambahkan ke transaksi ini."
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={() => {
              onProcess({
                id_pembayaran: currentTransaction.id_pembayaran,
                id_antrian: currentTransaction.id_antrian,
                id_kasir: currentTransaction.id_kasir,
                tanggal_transaksi:
                  new Date().toISOString().split("T")[0] +
                  " " +
                  new Date().toTimeString().split(" ")[0],
                metode_pembayaran: currentTransaction.metode_pembayaran,
                status_pembayaran: "Lunas",
              });
              onClose();
            }}
            className="bg-green-600 hover:bg-green-700"
            disabled={
              !["Transfer bank", "Tunai"].includes(
                currentTransaction.metode_pembayaran
              )
            }
          >
            Proses Transaksi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
