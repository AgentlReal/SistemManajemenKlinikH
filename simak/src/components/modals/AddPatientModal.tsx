import { patientSchema as schema, type Patient } from "@/types";
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

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (patient: Omit<Patient, "id">) => void;
  onUpdate: (patient: Patient) => void;
  editingPatient: Patient | null;
  onlyRead?: boolean;
}

export function AddPatientModal({
  isOpen,
  onClose,
  onAdd,
  editingPatient,
  onUpdate,
  onlyRead,
}: AddPatientModalProps) {
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
    if (editingPatient) {
      setValue("nik", editingPatient.nik);
      setValue("name", editingPatient.name);
      setValue("gender", editingPatient.gender);
      setValue("address", editingPatient.address);
      setValue("phone", editingPatient.phone);
      setValue("birthDate", editingPatient.birthDate);
    } else {
      reset();
    }
  }, [editingPatient, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    if (editingPatient) {
      onUpdate({
        ...data,
        id: editingPatient.id,
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
            {onlyRead ? "Detail" : editingPatient ? "Edit" : "Tambah"} Pasien
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nik">NIK</Label>
              <Input
                {...register("nik")}
                id="nik"
                placeholder="3201012345670001"
                readOnly={onlyRead}
              />
              {errors.nik && (
                <p className="text-sm text-destructive">{errors.nik.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="John Doe"
                readOnly={onlyRead}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="birthDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                      Tanggal Lahir
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger
                        asChild
                        className={onlyRead ? "pointer-events-none" : ""}
                      >
                        <Button
                          variant="outline"
                          id="date"
                          className="w-48 justify-between font-normal"
                        >
                          {value instanceof Date
                            ? value.toLocaleDateString("id-ID")
                            : "Select date"}
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
                    watch("birthDate")
                      ? new AgeFromDate(watch("birthDate")).age
                      : ""
                  }
                  readOnly
                  disabled
                />
              </div>
            </div>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value}
                    required
                  >
                    <SelectTrigger
                      id="gender"
                      className={onlyRead ? "pointer-events-none" : ""}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-destructive">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="phone">No Telp</Label>
              <Input
                {...register("phone")}
                placeholder="081234567890"
                readOnly={onlyRead}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                {...register("address")}
                placeholder="123 Main St, City"
                readOnly={onlyRead}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
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
              {onlyRead ? "Oke" : "Cancel"}
            </Button>
            {!onlyRead && (
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 hover:cursor-pointer"
              >
                {editingPatient ? "Simpan" : "Tambah"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
