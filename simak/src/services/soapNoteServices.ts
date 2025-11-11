import apiFetch from "@/lib/api";
import type { ViewSOAPNote } from "@/types";

export const fetchAllPatientSOAPsAPI = async (
  nik: string
): Promise<ViewSOAPNote[]> => {
  const response = await apiFetch(`/soap-lengkap/pasien/${nik}`);
  return response.data;
};
