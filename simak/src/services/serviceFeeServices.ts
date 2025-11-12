import apiFetch from "@/lib/api";
import type { ServiceFee } from "@/types";

export const fetchAllServiceFeesAPI = async () => {
  const response = await apiFetch("/tarif-layanan");
  return response.data;
};

export const createServiceFeeAPI = async (
  newServiceFee: Omit<ServiceFee, "id_tarif_layanan">
) => {
  await apiFetch("/tarif-layanan", {
    method: "POST",
    body: JSON.stringify(newServiceFee),
  });
  return;
};

export const updateServiceFeeAPI = async (updatedServiceFee: ServiceFee) => {
  await apiFetch(`/tarif-layanan/${updatedServiceFee.id_tarif_layanan}`, {
    method: "PUT",
    body: JSON.stringify(updatedServiceFee),
  });
  return;
};

export const deleteServiceFeeAPI = async (id: number) => {
  await apiFetch(`/tarif-layanan/${id}`, {
    method: "DELETE",
  });
  return;
};
