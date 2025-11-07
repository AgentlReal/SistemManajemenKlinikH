import { serviceFeeSchema as schema, type ServiceFee } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddServiceFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (serviceFee: Omit<ServiceFee, "id">) => void;
  onUpdate: (serviceFee: ServiceFee) => void;
  editingServiceFee: ServiceFee | null;
}

export function AddServiceFeeModal({
  isOpen,
  onClose,
  onAdd,
  editingServiceFee,
  onUpdate,
}: AddServiceFeeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editingServiceFee) {
      setValue("service", editingServiceFee.service);
      setValue("category", editingServiceFee.category);
      setValue("fee", editingServiceFee.fee);
    } else {
      reset();
    }
  }, [editingServiceFee, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof schema>> = (data) => {
    if (editingServiceFee) {
      onUpdate({
        ...data,
        id: editingServiceFee.id,
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
            {editingServiceFee ? "Edit" : "Tambah"} Tarif Layanan
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service">Nama Layanan</Label>
              <Input
                {...register("service")}
                id="service"
                placeholder="John Doe"
              />
              {errors.service && (
                <p className="text-sm text-destructive">
                  {errors.service.message}
                </p>
              )}
            </div>

            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dokter">Dokter</SelectItem>
                      <SelectItem value="lab">Lab</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="fee">Tarif</Label>
              <Input {...register("fee")} id="fee" placeholder="20000" />
              {errors.fee && (
                <p className="text-sm text-destructive">{errors.fee.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingServiceFee ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
