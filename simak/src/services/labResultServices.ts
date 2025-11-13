import apiFetch from "@/lib/api";
import type { ViewLabResult } from "@/types";

export const fetchAllPatientLabResultsAPI = async (
  nik: string
): Promise<ViewLabResult[]> => {
  const response = await apiFetch(`/hasil-lab/pasien/${nik}`);
  return response.data;
};
