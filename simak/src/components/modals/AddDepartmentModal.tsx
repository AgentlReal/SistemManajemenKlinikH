import { departmentSchema as schema, type Department } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
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

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (department: Omit<Department, "id_poli">) => void;
  onUpdate: (department: Department) => void;
  editingDepartment: Department | null;
}

export function AddDepartmentModal({
  isOpen,
  onClose,
  onAdd,
  editingDepartment,
  onUpdate,
}: AddDepartmentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editingDepartment) {
      setValue("nama_poli", editingDepartment.nama_poli);
    } else {
      reset();
    }
  }, [editingDepartment, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    if (editingDepartment) {
      onUpdate({
        ...data,
        id_poli: editingDepartment.id_poli,
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
            {editingDepartment ? "Edit" : "Tambah"} Poli
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nama_poli">Nama Poli</Label>
              <Input
                {...register("nama_poli")}
                id="nama_poli"
                placeholder="Umum"
              />
              {errors.nama_poli && (
                <p className="text-sm text-destructive">
                  {errors.nama_poli.message}
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
              {editingDepartment ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
