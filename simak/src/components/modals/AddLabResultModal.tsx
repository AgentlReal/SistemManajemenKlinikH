import type { LabResult } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "../ui/textarea";

const labResultSchema = z.object({
  id_staf_lab: z.string().min(1, "ID staf lab harus diisi"),
  id_rekam_medis: z.coerce.number().min(1, "ID rekam medis harus diisi"),
  jenis_pemeriksaan: z.string().min(1, "Jenis pemeriksaan harus diisi"),
  keterangan: z.string().min(1, "Keterangan harus diisi"),
  hasil_pemeriksaan: z.string().min(1, "Hasil pemeriksaan harus diisi"),
});

interface AddLabResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<LabResult, "id_hasil_lab">) => void;
  onUpdate: (data: LabResult) => void;
  editingLabResult: LabResult | null;
  id_rekam_medis?: number;
}

export function AddLabResultModal({
  isOpen,
  onClose,
  onAdd,
  editingLabResult: editingLabResult,
  onUpdate,
  id_rekam_medis,
}: AddLabResultModalProps) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    register,
  } = useForm({ resolver: zodResolver(labResultSchema) });

  useEffect(() => {
    if (editingLabResult) {
      setValue("id_staf_lab", editingLabResult.id_staf_lab);
      setValue("id_rekam_medis", editingLabResult.id_rekam_medis);
      setValue("jenis_pemeriksaan", editingLabResult.jenis_pemeriksaan);
      setValue("keterangan", editingLabResult.keterangan);
      setValue("hasil_pemeriksaan", editingLabResult.hasil_pemeriksaan);
    } else {
      reset();
      setValue("id_staf_lab", "L001");
      setValue("id_rekam_medis", id_rekam_medis);
    }
  }, [editingLabResult, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof labResultSchema>> = (data) => {
    if (editingLabResult) {
      onUpdate({
        ...data,
        id_hasil_lab: editingLabResult.id_hasil_lab,
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Lab Result</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jenis_pemeriksaan">Jenis Pemeriksaan</Label>
              <Input
                {...register("jenis_pemeriksaan")}
                id="jenis_pemeriksaan"
                placeholder="e.g., Complete Blood Count (CBC)"
              />
              {errors.jenis_pemeriksaan && (
                <p className="text-sm text-destructive">
                  {errors.jenis_pemeriksaan.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hasil_pemeriksaan">Hasil Pemeriksaan</Label>
              <Textarea
                {...register("hasil_pemeriksaan")}
                id="hasil_pemeriksaan"
                placeholder="e.g., WBC: 7,500/μL, RBC: 5.2 M/μL"
              />
              {errors.hasil_pemeriksaan && (
                <p className="text-sm text-destructive">
                  {errors.hasil_pemeriksaan.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="keterangan">Keterangan</Label>
              <Textarea
                {...register("keterangan")}
                id="keterangan"
                placeholder="e.g., All values within normal range"
              />
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
              Add Result
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
