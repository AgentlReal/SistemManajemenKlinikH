import apiFetch from "@/lib/api";
import type { Receptionist } from "@/types";

const transformReceptionistToAPI = (
  receptionist: Omit<Receptionist, "id_resepsionis">
) => ({
  ...receptionist,
  tanggal_lahir: receptionist.tanggal_lahir.toISOString().split("T")[0],
});

const transformReceptionistFromAPI = (
  receptionist: Receptionist
): Receptionist => ({
  ...receptionist,
  tanggal_lahir: new Date(receptionist.tanggal_lahir),
});

export const fetchAllReceptionistsAPI = async () => {
  const response = await apiFetch("/resepsionis");
  return response.data.map(transformReceptionistFromAPI);
};

export const createReceptionistAPI = async (
  newReceptionist: Omit<Receptionist, "id_resepsionis">
) => {
  console.log(JSON.stringify(transformReceptionistToAPI(newReceptionist)));

  await apiFetch("/resepsionis", {
    method: "POST",
    body: JSON.stringify(transformReceptionistToAPI(newReceptionist)),
  });
  return;
};

export const updateReceptionistAPI = async (
  updatedReceptionist: Receptionist
) => {
  await apiFetch(`/resepsionis/${updatedReceptionist.id_resepsionis}`, {
    method: "PUT",
    body: JSON.stringify(transformReceptionistToAPI(updatedReceptionist)),
  });
  return;
};

export const deleteReceptionistAPI = async (id: string) => {
  await apiFetch(`/resepsionis/${id}`, {
    method: "DELETE",
  });
  return;
};
