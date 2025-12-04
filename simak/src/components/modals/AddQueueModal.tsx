import { useAuth } from "@/hooks/use-auth";
import { fetchAllDepartmentsAPI } from "@/services/departmentServices";
import { fetchAllDoctorsAPI } from "@/services/doctorServices";
import { fetchAllPatientsAPI } from "@/services/patientServices";
import { fetchAllSchedulesAPI } from "@/services/scheduleServices";
import {
  type BackendQueuePayload,
  type Department,
  type QueueStatus,
  type ViewDoctor,
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

const addQueueFormSchema = z.object({
  id_resepsionis: z.string().min(1, "ID Resepsionis harus diisi"),
  id_pasien: z.coerce.number().min(1, "ID Pasien harus diisi"),
  id_dokter: z.string().min(1, "ID Dokter harus diisi"),
  keluhan: z.string().min(1, "Keluhan harus diisi"),
  // nomor_antrian: z.string().min(1, "Nomor Antrian harus diisi"),
  keterangan: z.enum<QueueStatus[]>(
    ["Menunggu", "Berlangsung", "Selesai"],
    "Status harus diisi"
  ),
});

const dayMapper: Record<number, string> = {
  1: "senin",
  2: "selasa",
  3: "rabu",
  4: "kamis",
  5: "jumat",
  6: "sabtu",
  7: "minggu",
};

interface AddQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (queue: Omit<BackendQueuePayload, "id_antrian">) => void;
  onUpdate: (queue: BackendQueuePayload) => void;
  editingQueue: BackendQueuePayload | null;
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
  } = useForm({
    resolver: zodResolver(addQueueFormSchema),
  });

  const { user } = useAuth();

  const [patientPopoverOpen, setPatientPopoverOpen] = useState(false);
  const [doctorPopoverOpen, setDoctorPopoverOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchAllPatientsAPI,
  });

  const { data: doctors = [] } = useQuery<
    (Omit<ViewDoctor, "tanggal_lahir"> & { tanggal_lahir: Date })[]
  >({
    queryKey: ["doctors"],
    queryFn: () => fetchAllDoctorsAPI(),
  });

  const { data: departments = [] } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: () => fetchAllDepartmentsAPI(),
  });

  const { data: schedules = [] } = useQuery<ViewSchedule[]>({
    queryKey: ["schedules"],
    queryFn: () => fetchAllSchedulesAPI(),
  });

  const [searchPatient, setSearchPatient] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");

  useEffect(() => {
    if (editingQueue) {
      setValue("id_resepsionis", editingQueue.id_resepsionis);
      setValue("id_dokter", editingQueue.id_dokter);
      setValue("id_pasien", editingQueue.id_pasien);
      setValue("keluhan", editingQueue.keluhan);
      // setValue("nomor_antrian", editingQueue.nomor_antrian);
      setValue("keterangan", editingQueue.keterangan);

      setSelectedDepartment(
        departments
          .map((d) => d.nama_poli)
          .find(
            (de) =>
              doctors.find((d) => d.id_dokter === editingQueue.id_dokter)
                ?.nama_poli === de
          ) || ""
      );
    } else {
      reset();
      setValue("id_resepsionis", user?.id_resepsionis || "R001");
      setValue("keterangan", "Menunggu");
    }
  }, [editingQueue, isOpen, reset, setValue]);

  const onValid: SubmitHandler<z.infer<typeof addQueueFormSchema>> = (data) => {
    if (editingQueue) {
      onUpdate({ ...data, id_antrian: editingQueue.id_antrian });
    } else {
      onAdd(data);
    }
    handleClose();
  };

  const handleClose = () => {
    reset();
    setSelectedDepartment("");
    onClose();
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
      patient.nik.toLowerCase().includes(searchPatient.toLowerCase())
  );
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.nama_poli === selectedDepartment &&
      !!schedules.find(
        (s) =>
          s.id_karyawan === doctor.id_dokter &&
          s[dayMapper[new Date().getDay()] as "senin"] &&
          new Date(
            `${new Date().toISOString().split("T")[0]}T${s.jam_mulai}`
          ).getTime() < Date.now() &&
          Date.now() <
            new Date(
              `${new Date().toISOString().split("T")[0]}T${s.jam_selesai}`
            ).getTime()
      ) &&
      (doctor.nama_dokter.toLowerCase().includes(searchDoctor.toLowerCase()) ||
        doctor.id_dokter.toLowerCase().includes(searchDoctor.toLowerCase()))
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingQueue ? "Edit Antrian" : "Tambah Antrian"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(data) => {
            handleSubmit(onValid)(data);
          }}
        >
          <div className="space-y-4 py-4">
            <Controller
              name="id_pasien"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="id_pasien">Nama Pasien</Label>
                  <Popover
                    open={patientPopoverOpen}
                    onOpenChange={setPatientPopoverOpen}
                  >
                    <PopoverTrigger asChild disabled={!!editingQueue}>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {value
                          ? patients.find((patient) => patient.id == value)
                              ?.name
                          : "Pilih pasien..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Cari pasien berdasarkan NIK atau Nama..."
                          className="h-9"
                          value={searchPatient}
                          onValueChange={setSearchPatient}
                        />
                        <CommandList>
                          <CommandEmpty>Tidak ada pasien.</CommandEmpty>
                          <CommandGroup>
                            {filteredPatients.map((patient) => (
                              <CommandItem
                                key={patient.id}
                                value={patient.id}
                                onSelect={(currentValue) => {
                                  onChange(parseInt(currentValue));
                                  setSearchPatient("");
                                  setPatientPopoverOpen(false);
                                }}
                              >
                                {patient.nik} - {patient.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.id_pasien && (
                    <p className="text-sm text-destructive">
                      {errors.id_pasien.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="keluhan">Keluhan</Label>
              <Input
                id="keluhan"
                {...register("keluhan")}
                required
                disabled={!!editingQueue}
              />
              {errors.keluhan && (
                <p className="text-sm text-destructive">
                  {errors.keluhan.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="poli">Poli</Label>
              <Select
                onValueChange={(v) => setSelectedDepartment(() => v)}
                defaultValue={selectedDepartment}
                disabled={!!editingQueue}
                required
              >
                <SelectTrigger id="poli">
                  <SelectValue placeholder="Pilih poli" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem value={d.nama_poli}>{d.nama_poli}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDepartment && (
              <Controller
                name="id_dokter"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Label htmlFor="id_dokter">Nama Dokter</Label>
                    <Popover
                      open={doctorPopoverOpen}
                      onOpenChange={setDoctorPopoverOpen}
                    >
                      <PopoverTrigger asChild disabled={!!editingQueue}>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {!value
                            ? "Pilih dokter..."
                            : filteredDoctors.find(
                                (doctor) => doctor.id_dokter === value
                              )
                            ? filteredDoctors.find(
                                (doctor) => doctor.id_dokter === value
                              )?.nama_dokter
                            : "Pilih dokter..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Cari dokter berdasarkan ID atau Nama..."
                            className="h-9"
                            value={searchDoctor}
                            onValueChange={setSearchDoctor}
                          />
                          <CommandList>
                            <CommandEmpty>Tidak ada dokter.</CommandEmpty>
                            <CommandGroup>
                              {filteredDoctors.map((doctor) => (
                                <CommandItem
                                  key={doctor.id_dokter}
                                  value={doctor.id_dokter}
                                  onSelect={(currentValue) => {
                                    onChange(currentValue);
                                    setSearchDoctor("");
                                    setDoctorPopoverOpen(false);
                                  }}
                                >
                                  {doctor.id_dokter} - {doctor.nama_dokter}
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
            {editingQueue && (
              <Controller
                name="keterangan"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Label htmlFor="keterangan">Status</Label>
                    <Select
                      defaultValue={value || "menunggu"}
                      onValueChange={onChange}
                      required
                    >
                      <SelectTrigger id="keterangan">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Menunggu">Menunggu</SelectItem>
                        <SelectItem value="Berlangsung">Berlangsung</SelectItem>
                        <SelectItem value="Selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.keterangan && (
                      <p className="text-sm text-destructive">
                        {errors.keterangan.message}
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
