import { cn } from "@/lib/utils";
import { queueItemSchema as schema, type QueueItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
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

interface AddQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (queue: Omit<QueueItem, "id" | "status" | "queueNumber">) => void;
  onUpdate: (queue: Omit<QueueItem, "queueNumber">) => void;
  editingQueue: QueueItem | null;
}

export function AddQueueModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingQueue,
}: AddQueueModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editingQueue) {
      setValue("patientName", editingQueue.patientName);
      setValue("department", editingQueue.department);
      setValue("doctor", editingQueue.doctor);
      setValue("time", editingQueue.time);
      setValue("status", editingQueue.status);
    } else {
      reset();
      setValue("status", "menunggu");
    }
  }, [editingQueue, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    console.log("sukses");

    if (editingQueue) {
      onUpdate({
        ...data,
        id: editingQueue.id,
      });
    } else {
      onAdd({
        ...data,
      });
    }
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingQueue ? "Edit Antrian" : "Tambah Antrian"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <Controller
              name="patientName"
              control={control}
              render={({ field: { value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-[200px] justify-between"
                      >
                        {value ? value : "Pilih pasien..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Cari pasien..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Pasien tidak ditemukan.</CommandEmpty>
                          <CommandGroup>
                            {[
                              {
                                value: "Bintang Sukidi",
                                label: "Bintang Sukidi",
                              },
                              {
                                value: "Firman El Salvador",
                                label: "Firman El Salvador",
                              },
                              {
                                value: "Ponco Suparman",
                                label: "Ponco Suparman",
                              },
                            ].map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue("patientName", currentValue);
                                }}
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.patientName && (
                    <p className="text-sm text-destructive">
                      {errors.patientName.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="department"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="department">Poli</Label>
                  <Select
                    defaultValue={value}
                    onValueChange={onChange}
                    required
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Pilih poli" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="umum">Umum</SelectItem>
                      <SelectItem value="gigi">Gigi</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-sm text-destructive">
                      {errors.department.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="doctor"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select
                    defaultValue={value}
                    onValueChange={onChange}
                    required
                  >
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                      <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                      <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                      <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                      <SelectItem value="Dr. Taylor">Dr. Taylor</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.doctor && (
                    <p className="text-sm text-destructive">
                      {errors.doctor.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="time">Appointment Time</Label>
              <Input
                id="time"
                {...register("time")}
                placeholder="09:00 AM"
                required
                defaultValue={`${
                  String(new Date().getHours()).length === 1
                    ? "0" + String(new Date().getHours())
                    : String(new Date().getHours())
                }:${new Date().getMinutes()}`}
                type="time"
              />
              {errors.time && (
                <p className="text-sm text-destructive">
                  {errors.time.message}
                </p>
              )}
            </div>

            {editingQueue && (
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue={value || "menunggu"}
                      onValueChange={onChange}
                      required
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menunggu">Menunggu</SelectItem>
                        <SelectItem value="berlangsung">Berlangsung</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <p className="text-sm text-destructive">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingQueue ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
