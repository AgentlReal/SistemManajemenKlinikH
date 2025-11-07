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
  onAdd: (cashier: Omit<Cashier, "id">) => void;
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
      setValue("name", editingCashier.name);
      setValue("wage", editingCashier.wage);
      setValue("gender", editingCashier.gender);
      setValue("address", editingCashier.address);
      setValue("phone", editingCashier.phone);
      setValue("birthDate", editingCashier.birthDate);
    } else {
      reset();
    }
  }, [editingCashier, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    if (editingCashier) {
      onUpdate({
        ...data,
        id: editingCashier.id,
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
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input {...register("name")} id="name" placeholder="John Doe" />
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
                      <PopoverTrigger asChild>
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
                />
              </div>
            </div>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Laki-laki</SelectItem>
                      <SelectItem value="female">Perempuan</SelectItem>
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
                id="phone"
                placeholder="081234567890"
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
                id="address"
                placeholder="123 Main St, City"
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="wage">Gaji</Label>
              <Input {...register("wage")} id="wage" placeholder="0" />
              {errors.wage && (
                <p className="text-sm text-destructive">
                  {errors.wage.message}
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
