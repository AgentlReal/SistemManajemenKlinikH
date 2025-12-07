import { labStaffSchema as schema, type LabStaff } from "@/types";
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

interface AddLabStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (labStaff: Omit<LabStaff, "id_staf_lab">) => void;
  onUpdate: (labStaff: LabStaff) => void;
  editingLabStaff: LabStaff | null;
}

export function AddLabStaffModal({
  isOpen,
  onClose,
  onAdd,
  editingLabStaff,
  onUpdate,
}: AddLabStaffModalProps) {
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
    if (editingLabStaff) {
      setValue("nama", editingLabStaff.nama);
      setValue("gaji", editingLabStaff.gaji);
      setValue("jenis_kelamin", editingLabStaff.jenis_kelamin);
      setValue("alamat", editingLabStaff.alamat);
      setValue("nomor_telepon", editingLabStaff.nomor_telepon);
      setValue("jenis_kelamin", editingLabStaff.jenis_kelamin);
      setValue("nomor_lisensi", editingLabStaff.nomor_lisensi);
      setValue("tanggal_lahir", editingLabStaff.tanggal_lahir);
    } else {
      reset();
    }
  }, [editingLabStaff, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    data.tanggal_lahir.setDate(data.tanggal_lahir.getDate() + 1);
    if (editingLabStaff) {
      onUpdate({
        ...data,
        id_staf_lab: editingLabStaff.id_staf_lab,
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
            {editingLabStaff ? "Edit" : "Tambah"} Staff Lab
          </DialogTitle>
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
                    {errors.tanggal_lahir && (
                      <p className="text-sm text-destructive">
                        {errors.tanggal_lahir.message}
                      </p>
                    )}
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
              <Label htmlFor="nomor_lisensi">No Lisensi</Label>
              <Input
                {...register("nomor_lisensi")}
                id="nomor_lisensi"
                placeholder="SIP-12346"
              />
              {errors.nomor_lisensi && (
                <p className="text-sm text-destructive">
                  {errors.nomor_lisensi.message}
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
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingLabStaff ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
