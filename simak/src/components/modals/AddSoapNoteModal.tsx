import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SOAPNote } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const soapNoteSchema = z.object({
  id_rekam_medis: z.coerce.number(),
  id_dokter: z.string().min(1, "Subjective notes are required."),
  subjective: z.string().min(1, "Subjective notes are required."),
  objective: z.string().min(1, "Objective notes are required."),
  assessment: z.string().min(1, "Assessment is required."),
  plan: z.string().min(1, "Plan is required."),
  tanggal_pencatatan: z.string().min(1, "Plan is required."),
});

interface AddSoapNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (soap: Omit<SOAPNote, "id_soap">) => void;
  onUpdate: (soap: SOAPNote) => void;
  editingSOAP: SOAPNote | null;
  id_rekam_medis?: number;
}

export function AddSoapNoteModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingSOAP,
  id_rekam_medis,
}: AddSoapNoteModalProps) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({ resolver: zodResolver(soapNoteSchema) });

  useEffect(() => {
    if (editingSOAP) {
      setValue("id_rekam_medis", editingSOAP.id_rekam_medis);
      setValue("id_dokter", editingSOAP.id_dokter);
      setValue("subjective", editingSOAP.subjective);
      setValue("objective", editingSOAP.objective);
      setValue("assessment", editingSOAP.assessment);
      setValue("plan", editingSOAP.plan);
    } else {
      reset();
      setValue("id_dokter", "D001");
      setValue("tanggal_pencatatan", "D001");
      setValue("id_rekam_medis", id_rekam_medis);
    }
  }, [editingSOAP, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof soapNoteSchema>> = (data) => {
    if (editingSOAP) {
      onUpdate({
        ...data,
        id_soap: editingSOAP.id_soap,
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
          <DialogTitle>Add New SOAP Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <form onSubmit={handleSubmit(onValid)} className="space-y-4">
            <Controller
              control={control}
              name="subjective"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Subjective (S)</Label>
                  <Textarea placeholder="Patient complaints..." {...field} />
                  {errors.subjective && (
                    <p className="text-sm text-destructive">
                      {errors.subjective.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="objective"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Objective (O)</Label>
                  <Textarea
                    placeholder="Observations and measurements..."
                    {...field}
                  />
                  {errors.objective && (
                    <p className="text-sm text-destructive">
                      {errors.objective.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="assessment"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Assessment (A)</Label>
                  <Textarea placeholder="Diagnosis..." {...field} />
                  {errors.assessment && (
                    <p className="text-sm text-destructive">
                      {errors.assessment.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="plan"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Plan (P)</Label>
                  <Textarea placeholder="Treatment plan..." {...field} />
                  {errors.plan && (
                    <p className="text-sm text-destructive">
                      {errors.plan.message}
                    </p>
                  )}
                </div>
              )}
            />
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
                Save Note
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
