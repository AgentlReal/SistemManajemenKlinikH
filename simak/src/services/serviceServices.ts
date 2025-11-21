import apiFetch from "@/lib/api";
import type { Service } from "@/types";

export const fetchAllServicesAPI = async (id_pembayaran: number) => {
  const response = await apiFetch(
    `/penggunaan-layanan-lengkap/${id_pembayaran}`
  );
  return response.data;
};

export const createServiceAPI = async (
  newService: Omit<Service, "id_penggunaan_layanan" | "harga_saat_itu">,
  id_pembayaran: number
) => {
  await apiFetch(`/penggunaan-layanan/${id_pembayaran}`, {
    method: "POST",
    body: JSON.stringify(newService),
  });
  return;
};

export const updateServiceAPI = async (updatedService: Service) => {
  await apiFetch(
    `/penggunaan-layanan/${updatedService.id_penggunaan_layanan}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedService),
    }
  );
  return;
};

export const deleteServiceAPI = async (id: number) => {
  await apiFetch(`/penggunaan-layanan/${id}`, {
    method: "DELETE",
  });
  return;
};
