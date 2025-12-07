import { cashierSchema as schema, type Cashier } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgeFromDate } from "age-calculator";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddCashierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (cashier: Omit<Cashier, "id_kasir">) => void;
  onUpdate: (cashier: Cashier) => void;
  editingCashier: Cashier | null;
}

export function AddCashierModal({
  isOpen,
  onClose,
  onAdd,
  editingCashier,
  onUpdate,
}: AddCashierModalProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
    watch,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editingCashier) {
      setValue("nama", editingCashier.nama);
      setValue("gaji", editingCashier.gaji);
      setValue("jenis_kelamin", editingCashier.jenis_kelamin);
      setValue("alamat", editingCashier.alamat);
      setValue("nomor_telepon", editingCashier.nomor_telepon);
      setValue("tanggal_lahir", editingCashier.tanggal_lahir);
    } else {
      reset();
    }
  }, [editingCashier, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    data.tanggal_lahir.setDate(data.tanggal_lahir.getDate() + 1);

    if (editingCashier) {
      onUpdate({
        ...data,
        id_kasir: editingCashier.id_kasir,
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
          <DialogTitle>{editingCashier ? "Edit" : "Tambah"} Kasir</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input {...register("nama")} id="nama" placeholder="John Doe" />
              {errors.nama && (
                <p className="text-sm text-destructive">
                  {errors.nama.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="tanggal_lahir"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                      Tanggal Lahir
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-48 justify-between font-normal"
                        >
                          {value instanceof Date
                            ? value.toLocaleDateString("id-ID")
                            : "Pilih tanggal lahir"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                        side="bottom"
                        avoidCollisions={false}
                      >
                        <Calendar
                          defaultMonth={value}
                          mode="single"
                          selected={value}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            onChange(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              />
              <div className="space-y-2">
                <Label htmlFor="age">Umur</Label>
                <Input
                  id="age"
                  value={
                    watch("tanggal_lahir")
                      ? new AgeFromDate(watch("tanggal_lahir")).age
                      : ""
                  }
                  readOnly
                  disabled
                />
              </div>
            </div>
            <Controller
              name="jenis_kelamin"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger id="jenis_kelamin">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jenis_kelamin && (
                    <p className="text-sm text-destructive">
                      {errors.jenis_kelamin.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="nomor_telepon">No Telp</Label>
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
              <Label htmlFor="alamat">Alamat</Label>
              <Input
                {...register("alamat")}
                id="alamat"
                placeholder="123 Main St, City"
              />
              {errors.alamat && (
                <p className="text-sm text-destructive">
                  {errors.alamat.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gaji">Gaji</Label>
              <Input {...register("gaji")} id="gaji" placeholder="0" />
              {errors.gaji && (
                <p className="text-sm text-destructive">
                  {errors.gaji.message}
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
              {editingCashier ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
