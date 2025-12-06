import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import apiFetch from "@/lib/api";
import { fetchAllTransactionsAPI } from "@/services/transactionServices";
import type { ViewTransactionClient } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const doctorRecipeSchema = z.object({
  id_dokter: z.string().min(1),
  id_rekam_medis: z.coerce.number(),
  id_pembayaran: z.coerce.number(),
  nama_obat: z.string(),
  keterangan_resep: z.string(),
  tanggal_resep: z.string(),
});

export type DoctorRecipe = z.infer<typeof doctorRecipeSchema> & {
  id_resep_dokter: number;
};
interface AddDoctorRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (recipe: any) => void;
  editingRecipe: DoctorRecipe | null;
  id_rekam_medis?: number;
}

export function AddDoctorRecipeModal({
  isOpen,
  onClose,
  onAdd,
  editingRecipe,
  id_rekam_medis,
}: AddDoctorRecipeModalProps) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
    register,
  } = useForm({ resolver: zodResolver(doctorRecipeSchema) });

  const { user } = useAuth();

  const { data: transactions = [] } = useQuery<ViewTransactionClient[]>({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactionsAPI,
  });
  const [patient, setPatient] = useState<{ nama: string } | null>(null);

  const onValid: SubmitHandler<z.infer<typeof doctorRecipeSchema>> = (data) => {
    onAdd(data);

    onClose();
  };

  useEffect(() => {
    const getPatient = async () => {
      const response = await apiFetch(`/pasien/rekam-medis/${id_rekam_medis}`);
      const data = response.data as { nama: string };
      setPatient(() => data);
      console.log(data);
    };
    if (id_rekam_medis) getPatient();
  }, [id_rekam_medis, isOpen]);

  useEffect(() => {
    if (editingRecipe) {
      setValue("id_dokter", editingRecipe.id_dokter);
      setValue("id_rekam_medis", editingRecipe.id_rekam_medis);
      setValue("id_pembayaran", editingRecipe.id_pembayaran);
      setValue("tanggal_resep", editingRecipe.tanggal_resep);
      setValue("nama_obat", editingRecipe.nama_obat);
      setValue("keterangan_resep", editingRecipe.keterangan_resep);
    } else {
      reset();
      setValue("id_dokter", user?.id_dokter || "");
      setValue("id_rekam_medis", id_rekam_medis);
      setValue("tanggal_resep", new Date().toISOString());
    }
  }, [editingRecipe, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Resep Dokter</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(data) => {
            handleSubmit(onValid)(data);
          }}
        >
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nama_obat">Nama Obat</Label>
              <Input
                id="nama_obat"
                {...register("nama_obat")}
                placeholder="Contoh: Paracetamol 500mg"
              />
              {errors.nama_obat && (
                <p className="text-sm text-destructive">
                  {errors.nama_obat.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="keterangan_resep">Keterangan</Label>
              <Textarea
                id="keterangan_resep"
                {...register("keterangan_resep")}
                placeholder="Contoh: 1 tablet 3 kali sehari setelah makan"
              />
              {errors.keterangan_resep && (
                <p className="text-sm text-destructive">
                  {errors.keterangan_resep.message}
                </p>
              )}
            </div>
            <Controller
              name="id_pembayaran"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="id_pembayaran">Transaksi</Label>
                  <Select
                    onValueChange={onChange}
                    defaultValue={
                      typeof value === "number" ? String(value) : undefined
                    }
                    required
                  >
                    <SelectTrigger id="id_pembayaran">
                      <SelectValue placeholder="Pilih transaksi" />
                    </SelectTrigger>
                    <SelectContent>
                      {transactions.filter(
                        (t) =>
                          t.status_pembayaran === "Belum Lunas" &&
                          t.nama_pasien === patient?.nama
                      ).length !== 0 ? (
                        transactions
                          .filter(
                            (t) =>
                              t.status_pembayaran === "Belum Lunas" &&
                              t.nama_pasien === patient?.nama
                          )
                          .map((t) => (
                            <SelectItem value={String(t.id_pembayaran)}>
                              {t.id_pembayaran} - {t.nama_pasien}
                            </SelectItem>
                          ))
                      ) : (
                        <div className="rounded-sm py-1.5 pr-8 pl-2 text-sm">
                          Tidak ada transaksi.
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.id_pembayaran && (
                    <p className="text-sm text-destructive">
                      {errors.id_pembayaran.message}
                    </p>
                  )}
                </div>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Tambah
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
