import apiFetch from "@/lib/api";
import type { Service } from "@/types";

export const fetchAllServicesAPI = async (id_pembayaran: number) => {
  const response = await apiFetch(
    `/penggunaan-layanan-lengkap/${id_pembayaran}`
  );
  return response.data;
};

export const createServiceAPI = async (
  newService: Omit<Service, "id_tarif_layanan">
) => {
  await apiFetch("/penggunaan-layanan", {
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
