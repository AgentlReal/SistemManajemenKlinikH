import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { fetchAllServiceFeesAPI } from "@/services/serviceFeeServices";
import {
  createServiceAPI,
  fetchAllServicesAPI,
} from "@/services/serviceServices";
import type {
  Service,
  ServiceFee,
  ViewService,
  ViewTransactionClient,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddServiceToTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: ViewTransactionClient;
}

export function AddServiceToTransactionModal({
  isOpen,
  onClose,
  transaction,
}: AddServiceToTransactionModalProps) {
  const [selectedService, setSelectedService] = useState<ServiceFee | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data: serviceFees = [] } = useQuery<ServiceFee[]>({
    queryKey: ["serviceFees"],
    queryFn: () => fetchAllServiceFeesAPI(),
  });

  const { data: cart = [], isLoading } = useQuery<ViewService[]>({
    queryKey: ["servicesInTransaction", transaction.id_pembayaran],
    queryFn: () => fetchAllServicesAPI(transaction.id_pembayaran),
  });

  const createServiceMutation = useMutation<Service, Error, ServiceFee>({
    mutationFn: async (s: ServiceFee) => {
      await createServiceAPI(
        {
          id_pembayaran: transaction.id_pembayaran,
          id_tarif_layanan: s.id_tarif_layanan,
          kuantitas: quantity,
        },
        transaction.id_pembayaran
      );
      return {} as Service;
    },
    onSuccess: () => {
      toast.success("Biaya Layanan berhasil ditambahkan");
      queryClient.invalidateQueries({
        queryKey: ["servicesInTransaction", transaction.id_pembayaran],
      });
    },
    onError: () => {
      toast.error("Biaya Layanan gagal ditambahkan");
    },
  });

  const handleAddService = createServiceMutation.mutate;

  const handleRemoveService = (serviceId: string) => {};

  const total = cart.reduce(
    (acc, item) => acc + item.harga_saat_itu * item.kuantitas,
    0
  );

  const filteredServiceFees = user?.id_dokter
    ? serviceFees.filter((s) => s.tipe_layanan === "Dokter")
    : user?.id_staf_lab
    ? serviceFees.filter((s) => s.tipe_layanan === "Laboratorium")
    : serviceFees;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Tambah Layanan ke Transaksi</DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-1">
          <Card>
            <CardHeader>
              <CardTitle>Pilih Layanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 space-y-2">
                  <Label>Nama Layanan</Label>
                  <Select
                    onValueChange={(serviceId) => {
                      if (serviceFees) {
                        const service = serviceFees.find(
                          (s) => s.id_tarif_layanan === Number(serviceId)
                        );
                        setSelectedService(service || null);
                      }
                    }}
                    value={selectedService?.id_tarif_layanan.toString() || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredServiceFees
                        ? filteredServiceFees.map((service) => (
                            <SelectItem
                              key={service.id_tarif_layanan}
                              value={service.id_tarif_layanan.toString()}
                            >
                              {service.nama_layanan}
                            </SelectItem>
                          ))
                        : "Kosong"}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="quantity">Jumlah</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
                <div className="col-span-4 space-y-2">
                  <Label>Harga Satuan</Label>
                  <Input
                    value={
                      selectedService
                        ? `Rp ${selectedService.Harga.toLocaleString("id-ID")}`
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() =>
                  selectedService && handleAddService(selectedService)
                }
                disabled={!selectedService}
              >
                Tambah
              </Button>
            </CardFooter>
          </Card>

          {isLoading ? (
            <div className="flex flex-col justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            cart.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">
                  Layanan Ditambahkan
                </h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Layanan</TableHead>
                        <TableHead className="text-center">Jumlah</TableHead>
                        <TableHead className="text-right">
                          Harga Satuan
                        </TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item) => (
                        <TableRow key={item.id_tarif_layanan}>
                          <TableCell>{item.nama_layanan}</TableCell>
                          <TableCell className="text-center">
                            {item.kuantitas}
                          </TableCell>
                          <TableCell className="text-right">
                            Rp {item.harga_saat_itu.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell className="text-right">
                            Rp{" "}
                            {(
                              item.harga_saat_itu * item.kuantitas
                            ).toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {}}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="text-right">
                    <p className="text-muted-foreground">Total Keseluruhan</p>
                    <p className="text-2xl font-bold">
                      Rp {total.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700"
            disabled={cart.length === 0}
          >
            Simpan Transaksi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
