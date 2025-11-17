import apiFetch from "@/lib/api";
import type { SOAPNote, ViewSOAPNote } from "@/types";

export const fetchAllPatientSOAPsAPI = async (
  nik: string
): Promise<ViewSOAPNote[]> => {
  const response = await apiFetch(`/soap-lengkap/pasien/${nik}`);
  return response.data;
};

export const createPatientSOAPAPI = async (
  newPatientSOAP: Omit<SOAPNote, "id_soap">
) => {
  await apiFetch("/soap", {
    method: "POST",
    body: JSON.stringify(newPatientSOAP),
  });
  return;
};

export const updatePatientSOAPAPI = async (updatedPatientSOAP: SOAPNote) => {
  await apiFetch(`/soap/${updatedPatientSOAP.id_soap}`, {
    method: "PUT",
    body: JSON.stringify(updatedPatientSOAP),
  });
  return;
};

export const deletePatientSOAPAPI = async (id: string) => {
  await apiFetch(`/soap/${id}`, {
    method: "DELETE",
  });
  return;
};
