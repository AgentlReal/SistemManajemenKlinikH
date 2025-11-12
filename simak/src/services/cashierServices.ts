import apiFetch from "@/lib/api";
import type { Cashier } from "@/types";

const transformCashierToAPI = (receptionist: Omit<Cashier, "id_kasir">) => ({
  ...receptionist,
  tanggal_lahir: receptionist.tanggal_lahir.toISOString().split("T")[0],
});

const transformCashierFromAPI = (receptionist: Cashier): Cashier => ({
  ...receptionist,
  tanggal_lahir: new Date(receptionist.tanggal_lahir),
});

export const fetchAllCashiersAPI = async () => {
  const response = await apiFetch("/kasir");
  return response.data.map(transformCashierFromAPI);
};

export const createCashierAPI = async (
  newCashier: Omit<Cashier, "id_kasir">
) => {
  await apiFetch("/kasir", {
    method: "POST",
    body: JSON.stringify(transformCashierToAPI(newCashier)),
  });
  return;
};

export const updateCashierAPI = async (updatedCashier: Cashier) => {
  await apiFetch(`/kasir/${updatedCashier.id_kasir}`, {
    method: "PUT",
    body: JSON.stringify(transformCashierToAPI(updatedCashier)),
  });
  return;
};

export const deleteCashierAPI = async (id: string) => {
  await apiFetch(`/kasir/${id}`, {
    method: "DELETE",
  });
  return;
};
