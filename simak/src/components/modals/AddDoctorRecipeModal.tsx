import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddDoctorRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (recipe: any) => void;
}

export function AddDoctorRecipeModal({
  isOpen,
  onClose,
  onAdd,
}: AddDoctorRecipeModalProps) {
  const [namaObat, setNamaObat] = useState("");
  const [keteranganResep, setKeteranganResep] = useState("");

  const handleSubmit = () => {
    onAdd({
      nama_obat: namaObat,
      keterangan_resep: keteranganResep,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Resep Dokter</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nama_obat">Nama Obat</Label>
            <Input
              id="nama_obat"
              value={namaObat}
              onChange={(e) => setNamaObat(e.target.value)}
              placeholder="Contoh: Paracetamol 500mg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keterangan_resep">Keterangan</Label>
            <Textarea
              id="keterangan_resep"
              value={keteranganResep}
              onChange={(e) => setKeteranganResep(e.target.value)}
              placeholder="Contoh: 1 tablet 3 kali sehari setelah makan"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            Tambah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
