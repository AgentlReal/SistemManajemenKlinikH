import { serviceFeeSchema as schema, type ServiceFee } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddServiceFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (serviceFee: Omit<ServiceFee, "id_tarif_layanan">) => void;
  onUpdate: (serviceFee: ServiceFee) => void;
  editingServiceFee: ServiceFee | null;
}

export function AddServiceFeeModal({
  isOpen,
  onClose,
  onAdd,
  editingServiceFee,
  onUpdate,
}: AddServiceFeeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editingServiceFee) {
      setValue("nama_layanan", editingServiceFee.nama_layanan);
      setValue("tipe_layanan", editingServiceFee.tipe_layanan);
      setValue("Harga", editingServiceFee.Harga);
    } else {
      reset();
    }
  }, [editingServiceFee, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    if (editingServiceFee) {
      onUpdate({
        ...data,
        id_tarif_layanan: editingServiceFee.id_tarif_layanan,
      });
    } else {
      onAdd(data);
    }
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingServiceFee ? "Edit" : "Tambah"} Tarif Layanan
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nama_layanan">Nama Layanan</Label>
              <Input
                {...register("nama_layanan")}
                id="nama_layanan"
                placeholder="Konsultasi Umum"
              />
              {errors.nama_layanan && (
                <p className="text-sm text-destructive">
                  {errors.nama_layanan.message}
                </p>
              )}
            </div>

            <Controller
              name="tipe_layanan"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="tipe_layanan">Kategori</Label>
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger id="tipe_layanan">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dokter">Dokter</SelectItem>
                      <SelectItem value="Laboratorium">Laboratorium</SelectItem>
                      <SelectItem value="Administrasi">Administrasi</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipe_layanan && (
                    <p className="text-sm text-destructive">
                      {errors.tipe_layanan.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="Harga">Tarif</Label>
              <Input {...register("Harga")} id="Harga" placeholder="20000" />
              {errors.Harga && (
                <p className="text-sm text-destructive">
                  {errors.Harga.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingServiceFee ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
