import { clinicInfoSchema, type ClinicInfo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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

interface AddClinicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  // This modal is not connected to a backend, so onSave just logs the data
  onSave: (data: ClinicInfo) => void;
  editingClinic?: ClinicInfo | null;
}

export function AddClinicInfoModal({
  isOpen,
  onClose,
  onSave,
  editingClinic,
}: AddClinicInfoModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(clinicInfoSchema),
    defaultValues: {
      id_klinik: 1, // Default for new clinic, will be overridden for editing
      nama_klinik: "",
      izin_operasional: "",
      alamat: "",
      nomor_telepon: "",
      email: "",
      jam_operasional: "",
    },
  });

  useEffect(() => {
    if (editingClinic) {
      setValue("id_klinik", editingClinic.id_klinik);
      setValue("nama_klinik", editingClinic.nama_klinik);
      setValue("izin_operasional", editingClinic.izin_operasional);
      setValue("alamat", editingClinic.alamat);
      setValue("nomor_telepon", editingClinic.nomor_telepon);
      setValue("email", editingClinic.email);
      setValue("jam_operasional", editingClinic.jam_operasional);
    } else {
      reset(); // Reset form for new clinic
      setValue("id_klinik", 1);
    }
  }, [editingClinic, isOpen, setValue, reset]);

  const onValid: SubmitHandler<ClinicInfo> = (data) => {
    onSave(data);
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
            {editingClinic ? "Edit Info Klinik" : "Tambah Info Klinik"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nama_klinik">Nama Klinik</Label>
              <Input
                {...register("nama_klinik")}
                id="nama_klinik"
                placeholder="Nama Klinik Anda"
              />
              {errors.nama_klinik && (
                <p className="text-sm text-destructive">
                  {errors.nama_klinik.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="izin_operasional">Izin Operasional</Label>
              <Input
                {...register("izin_operasional")}
                id="izin_operasional"
                placeholder="Contoh: SK/001/2023"
              />
              {errors.izin_operasional && (
                <p className="text-sm text-destructive">
                  {errors.izin_operasional.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat</Label>
              <Input
                {...register("alamat")}
                id="alamat"
                placeholder="Alamat Lengkap Klinik"
              />
              {errors.alamat && (
                <p className="text-sm text-destructive">
                  {errors.alamat.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomor_telepon">Nomor Telepon</Label>
              <Input
                {...register("nomor_telepon")}
                id="nomor_telepon"
                placeholder="081234567890"
              />
              {errors.nomor_telepon && (
                <p className="text-sm text-destructive">
                  {errors.nomor_telepon.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="email@klinik.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jam_operasional">Jam Operasional</Label>
              <Input
                {...register("jam_operasional")}
                id="jam_operasional"
                placeholder="Senin-Jumat, 08:00-17:00"
              />
              {errors.jam_operasional && (
                <p className="text-sm text-destructive">
                  {errors.jam_operasional.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 hover:cursor-pointer"
            >
              {editingClinic ? "Simpan Perubahan" : "Tambah Klinik"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
