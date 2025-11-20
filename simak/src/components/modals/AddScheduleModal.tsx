import {
  fetchAllEmployeesWithoutSchedulesAPI,
  fetchAllSchedulesAPI,
} from "@/services/scheduleServices";
import {
  scheduleSchema as schema,
  type Schedule,
  type ViewSchedule,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
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

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (schedule: Omit<Schedule, "id_jadwal">) => void;
  onUpdate: (schedule: Schedule) => void;
  editingSchedule: Schedule | null;
}

export function AddScheduleModal({
  isOpen,
  onClose,
  onAdd,
  editingSchedule,
  onUpdate,
}: AddScheduleModalProps) {
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<string>("");

  const [searchReceptionist, setSearchReceptionist] = useState("");
  const [receptionistPopoverOpen, setReceptionistPopoverOpen] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [doctorPopoverOpen, setDoctorPopoverOpen] = useState(false);
  const [searchLabStaff, setSearchLabStaff] = useState("");
  const [labStaffPopoverOpen, setLabStaffPopoverOpen] = useState(false);
  const [searchCashier, setSearchCashier] = useState("");
  const [cashierPopoverOpen, setCashierPopoverOpen] = useState(false);

  const { data: employeesWithoutSchedule = [] } = useQuery({
    queryKey: ["employeesWithoutSchedule"],
    queryFn: fetchAllEmployeesWithoutSchedulesAPI,
  });

  const { data: employeesWithSchedule = [] } = useQuery<ViewSchedule[]>({
    queryKey: ["schedules"],
    queryFn: () => fetchAllSchedulesAPI(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editingSchedule) {
      setValue("id_resepsionis", editingSchedule.id_resepsionis || null);
      setValue("id_dokter", editingSchedule.id_dokter || null);
      setValue("id_staf_lab", editingSchedule.id_staf_lab || null);
      setValue("id_kasir", editingSchedule.id_kasir || null);
      setValue("jam_mulai", editingSchedule.jam_mulai);
      setValue("jam_selesai", editingSchedule.jam_selesai);
      if (editingSchedule.id_resepsionis)
        setSelectedEmployeeType(() => "Resepsionis");
      else if (editingSchedule.id_dokter)
        setSelectedEmployeeType(() => "Dokter");
      else if (editingSchedule.id_staf_lab)
        setSelectedEmployeeType(() => "Staf Lab");
      else if (editingSchedule.id_kasir) setSelectedEmployeeType(() => "Kasir");
    } else {
      reset();
    }
  }, [editingSchedule, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    if (editingSchedule) {
      console.log({
        ...data,
        id_resepsionis: data.id_resepsionis || null,
        id_dokter: data.id_dokter || null,
        id_staf_lab: data.id_staf_lab || null,
        id_kasir: data.id_kasir || null,
        id_jadwal: editingSchedule.id_jadwal,
      });
      onUpdate({
        ...data,
        id_resepsionis: data.id_resepsionis || null,
        id_dokter: data.id_dokter || null,
        id_staf_lab: data.id_staf_lab || null,
        id_kasir: data.id_kasir || null,
        id_jadwal: editingSchedule.id_jadwal,
      });
    } else {
      onAdd({
        ...data,
        id_resepsionis: data.id_resepsionis || null,
        id_dokter: data.id_dokter || null,
        id_staf_lab: data.id_staf_lab || null,
        id_kasir: data.id_kasir || null,
      });
    }
    onClose();
  };

  const handleClose = () => {
    reset();
    setSelectedEmployeeType("");
    onClose();
  };

  const filteredReceptionists = employeesWithoutSchedule.filter(
    (patient) =>
      (patient.id_karyawan[0] === "R" &&
        patient.id_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase())) ||
      (patient.id_karyawan[0] === "R" &&
        patient.nama_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase()))
  );

  const filteredDoctors = employeesWithoutSchedule.filter(
    (patient) =>
      (patient.id_karyawan[0] === "D" &&
        patient.id_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase())) ||
      (patient.id_karyawan[0] === "D" &&
        patient.nama_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase()))
  );

  const filteredLabStaffs = employeesWithoutSchedule.filter(
    (patient) =>
      (patient.id_karyawan[0] === "L" &&
        patient.id_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase())) ||
      (patient.id_karyawan[0] === "L" &&
        patient.nama_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase()))
  );

  const filteredCashiers = employeesWithoutSchedule.filter(
    (patient) =>
      (patient.id_karyawan[0] === "K" &&
        patient.id_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase())) ||
      (patient.id_karyawan[0] === "K" &&
        patient.nama_karyawan
          .toLowerCase()
          .includes(searchReceptionist.toLowerCase()))
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingSchedule ? "Edit" : "Tambah"} Jadwal Karyawan
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jenis_karyawan">Jenis Karyawan</Label>
              <Select
                defaultValue={selectedEmployeeType}
                onValueChange={(value) => setSelectedEmployeeType(() => value)}
                disabled={!!editingSchedule}
              >
                <SelectTrigger id="jenis_karyawan">
                  <SelectValue placeholder="Pilih Jenis Karyawan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Resepsionis">Resepsionis</SelectItem>
                  <SelectItem value="Dokter">Dokter</SelectItem>
                  <SelectItem value="Staf Lab">Staf Lab</SelectItem>
                  <SelectItem value="Kasir">Kasir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedEmployeeType === "Resepsionis" && (
              <Controller
                name="id_resepsionis"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Label htmlFor="id_pasien">Nama Resepsionis</Label>
                    <Popover
                      open={receptionistPopoverOpen}
                      onOpenChange={setReceptionistPopoverOpen}
                    >
                      <PopoverTrigger asChild disabled={!!editingSchedule}>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {editingSchedule
                            ? editingSchedule.id_resepsionis ===
                                employeesWithSchedule.find(
                                  (e) =>
                                    e.id_karyawan ===
                                    editingSchedule.id_resepsionis
                                )?.id_karyawan &&
                              employeesWithSchedule.find(
                                (e) =>
                                  e.id_karyawan ===
                                  editingSchedule.id_resepsionis
                              )?.nama_karyawan
                            : value
                            ? employeesWithoutSchedule.find(
                                (patient) => patient.id_karyawan == value
                              )?.nama_karyawan
                            : "Pilih resepsionis..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Cari resepsionis nama..."
                            className="h-9"
                            value={searchReceptionist}
                            onValueChange={setSearchReceptionist}
                          />
                          <CommandList>
                            <CommandEmpty>
                              Tidak ada resepsionis yang <br /> tidak memiliki
                              jadwal.
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredReceptionists.map((receptionist) => (
                                <CommandItem
                                  key={receptionist.id_karyawan}
                                  value={receptionist.id_karyawan}
                                  onSelect={(currentValue) => {
                                    onChange(currentValue);
                                    setSearchReceptionist("");
                                    setReceptionistPopoverOpen(false);
                                  }}
                                >
                                  {receptionist.id_karyawan} -{" "}
                                  {receptionist.nama_karyawan}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.id_resepsionis && (
                      <p className="text-sm text-destructive">
                        {errors.id_resepsionis.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

            {selectedEmployeeType === "Dokter" && (
              <Controller
                name="id_dokter"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Label htmlFor="id_pasien">Nama Dokter</Label>
                    <Popover
                      open={doctorPopoverOpen}
                      onOpenChange={setDoctorPopoverOpen}
                    >
                      <PopoverTrigger asChild disabled={!!editingSchedule}>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {editingSchedule
                            ? editingSchedule.id_dokter ===
                                employeesWithSchedule.find(
                                  (e) =>
                                    e.id_karyawan === editingSchedule.id_dokter
                                )?.id_karyawan &&
                              employeesWithSchedule.find(
                                (e) =>
                                  e.id_karyawan === editingSchedule.id_dokter
                              )?.nama_karyawan
                            : value
                            ? employeesWithoutSchedule.find(
                                (patient) => patient.id_karyawan == value
                              )?.nama_karyawan
                            : "Pilih dokter..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Cari dokter nama..."
                            className="h-9"
                            value={searchDoctor}
                            onValueChange={setSearchDoctor}
                          />
                          <CommandList>
                            <CommandEmpty>
                              Tidak ada dokter yang <br />
                              tidak memiliki jadwal.
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredDoctors.map((doctor) => (
                                <CommandItem
                                  key={doctor.id_karyawan}
                                  value={doctor.id_karyawan}
                                  onSelect={(currentValue) => {
                                    onChange(currentValue);
                                    setSearchDoctor("");
                                    setDoctorPopoverOpen(false);
                                  }}
                                >
                                  {doctor.id_karyawan} - {doctor.nama_karyawan}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.id_dokter && (
                      <p className="text-sm text-destructive">
                        {errors.id_dokter.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

            {selectedEmployeeType === "Staf Lab" && (
              <Controller
                name="id_staf_lab"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Label htmlFor="id_pasien">Nama Staf Lab</Label>
                    <Popover
                      open={labStaffPopoverOpen}
                      onOpenChange={setLabStaffPopoverOpen}
                    >
                      <PopoverTrigger asChild disabled={!!editingSchedule}>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {editingSchedule
                            ? editingSchedule.id_staf_lab ===
                                employeesWithSchedule.find(
                                  (e) =>
                                    e.id_karyawan ===
                                    editingSchedule.id_staf_lab
                                )?.id_karyawan &&
                              employeesWithSchedule.find(
                                (e) =>
                                  e.id_karyawan === editingSchedule.id_staf_lab
                              )?.nama_karyawan
                            : value
                            ? employeesWithoutSchedule.find(
                                (patient) => patient.id_karyawan == value
                              )?.nama_karyawan
                            : "Pilih staf lab..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Cari staf lab nama..."
                            className="h-9"
                            value={searchLabStaff}
                            onValueChange={setSearchLabStaff}
                          />
                          <CommandList>
                            <CommandEmpty>
                              Tidak ada staf lab yang <br />
                              tidak memiliki jadwal.
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredLabStaffs.map((labStaff) => (
                                <CommandItem
                                  key={labStaff.id_karyawan}
                                  value={labStaff.id_karyawan}
                                  onSelect={(currentValue) => {
                                    onChange(currentValue);
                                    setSearchLabStaff("");
                                    setLabStaffPopoverOpen(false);
                                  }}
                                >
                                  {labStaff.id_karyawan} -{" "}
                                  {labStaff.nama_karyawan}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.id_staf_lab && (
                      <p className="text-sm text-destructive">
                        {errors.id_staf_lab.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

            {selectedEmployeeType === "Kasir" && (
              <Controller
                name="id_kasir"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Label htmlFor="id_pasien">Nama Kasir</Label>
                    <Popover
                      open={cashierPopoverOpen}
                      onOpenChange={setCashierPopoverOpen}
                    >
                      <PopoverTrigger asChild disabled={!!editingSchedule}>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {editingSchedule
                            ? editingSchedule.id_kasir ===
                                employeesWithSchedule.find(
                                  (e) =>
                                    e.id_karyawan === editingSchedule.id_kasir
                                )?.id_karyawan &&
                              employeesWithSchedule.find(
                                (e) =>
                                  e.id_karyawan === editingSchedule.id_kasir
                              )?.nama_karyawan
                            : value
                            ? employeesWithoutSchedule.find(
                                (patient) => patient.id_karyawan == value
                              )?.nama_karyawan
                            : "Pilih kasir..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Cari kasir nama..."
                            className="h-9"
                            value={searchCashier}
                            onValueChange={setSearchCashier}
                          />
                          <CommandList>
                            <CommandEmpty>
                              Tidak ada kasir yang <br />
                              tidak memiliki jadwal.
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredCashiers.map((cashier) => (
                                <CommandItem
                                  key={cashier.id_karyawan}
                                  value={cashier.id_karyawan}
                                  onSelect={(currentValue) => {
                                    onChange(currentValue);
                                    setSearchCashier("");
                                    setCashierPopoverOpen(false);
                                  }}
                                >
                                  {cashier.id_karyawan} -{" "}
                                  {cashier.nama_karyawan}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.id_kasir && (
                      <p className="text-sm text-destructive">
                        {errors.id_kasir.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

            <div className="space-y-2">
              <Label htmlFor="jam_mulai">Jam Mulai</Label>
              <Input
                {...register("jam_mulai")}
                type="time"
                id="jam_mulai"
                placeholder="20000"
                step={1}
              />
              {errors.jam_mulai && (
                <p className="text-sm text-destructive">
                  {errors.jam_mulai.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="jam_selesai">Jam Selesai</Label>
              <Input
                {...register("jam_selesai")}
                type="time"
                id="jam_selesai"
                placeholder="20000"
                step={1}
              />
              {errors.jam_selesai && (
                <p className="text-sm text-destructive">
                  {errors.jam_selesai.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingSchedule ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
