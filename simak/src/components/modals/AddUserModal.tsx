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

const userUpdateSchema = z.object({
  username: z
    .string()
    .min(1, "Username harus diisi")
    .max(100, "Username tidak boleh lebih dari 100 karakter"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .max(100, "Password tidak boleh lebih dari 100 karakter"),
});

export type UserUpdate = z.infer<typeof userUpdateSchema> & {
  id: number;
};

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    serviceFee: Omit<UserUpdate, "id"> & {
      id_resepsionis: string | null;
      id_dokter: string | null;
      id_staf_lab: string | null;
      id_kasir: string | null;
    }
  ) => void;
  onUpdate: (serviceFee: UserUpdate & { updatedAt: string }) => void;
  editingUser: Omit<UserUpdate, "password"> | null;
  addUser: {
    id_resepsionis: string | null;
    id_dokter: string | null;
    id_staf_lab: string | null;
    id_kasir: string | null;
  } | null;
}

export function AddUserModal({
  isOpen,
  onClose,
  onAdd,
  editingUser,
  onUpdate,
  addUser,
}: AddUserModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(userUpdateSchema) });

  useEffect(() => {
    if (editingUser) {
      setValue("username", editingUser.username);
      setValue("password", "");
    } else {
      reset();
    }
  }, [editingUser, isOpen]);

  const onValid: SubmitHandler<z.infer<typeof userUpdateSchema>> = (data) => {
    if (editingUser) {
      onUpdate({
        ...data,
        updatedAt: new Date().toISOString(),
        id: editingUser.id,
      });
    } else if (addUser) {
      onAdd({
        ...data,
        id_resepsionis: addUser.id_resepsionis,
        id_dokter: addUser.id_dokter,
        id_kasir: addUser.id_kasir,
        id_staf_lab: addUser.id_staf_lab,
      });
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
          <DialogTitle>{editingUser ? "Edit" : "Tambah"} Akun</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input {...register("username")} id="username" />
              {errors.username && (
                <p className="text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register("password")} id="password" />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingUser ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
