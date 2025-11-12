import type { BackendQueuePayload } from "@/types";
import apiFetch from "../lib/api";

const transformQueueToAPI = (
  queue: BackendQueuePayload
): BackendQueuePayload => ({
  id_antrian: queue.id_antrian,
  id_resepsionis: queue.id_resepsionis,
  id_dokter: queue.id_dokter,
  id_pasien: queue.id_pasien,
  keluhan: queue.keluhan,
  nomor_antrian: queue.nomor_antrian,
  keterangan: queue.keterangan,
});

export const fetchAllQueuesAPI = async () => {
  const response = await apiFetch("/antrian-lengkap");
  return response.data;
};

export const createQueueAPI = async (
  newQueuePayload: Omit<BackendQueuePayload, "id_antrian">
) => {
  const response = await apiFetch("/antrian", {
    method: "POST",
    body: JSON.stringify(newQueuePayload),
  });
};

export const updateQueueAPI = async (
  updatedQueuePayload: BackendQueuePayload
) => {
  const response = await apiFetch(
    `/antrian/${updatedQueuePayload.id_antrian}`,
    {
      method: "PUT",
      body: JSON.stringify(transformQueueToAPI(updatedQueuePayload)),
    }
  );
};

export const deleteQueueAPI = async (id: number): Promise<void> => {
  await apiFetch(`/antrian/${id}`, {
    method: "DELETE",
  });
  return;
};
