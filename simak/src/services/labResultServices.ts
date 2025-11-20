import apiFetch from "@/lib/api";
import type { LabResult, ViewLabResult } from "@/types";

export const fetchAllPatientLabResultsAPI = async (
  nik: string
): Promise<ViewLabResult[]> => {
  const response = await apiFetch(`/hasil-lab/pasien/${nik}`);
  return response.data;
};

export const createPatientLabResultAPI = async (
  newPatientLabResult: Omit<LabResult, "id_hasil_lab">
) => {
  await apiFetch("/hasil-lab", {
    method: "POST",
    body: JSON.stringify(newPatientLabResult),
  });
  return;
};

export const updatePatientLabResultAPI = async (
  updatedPatientLabResult: LabResult
) => {
  await apiFetch(`/hasil-lab/${updatedPatientLabResult.id_hasil_lab}`, {
    method: "PUT",
    body: JSON.stringify(updatedPatientLabResult),
  });
  return;
};

export const deletePatientLabResultAPI = async (id: string) => {
  await apiFetch(`/hasil-lab/${id}`, {
    method: "DELETE",
  });
  return;
};
