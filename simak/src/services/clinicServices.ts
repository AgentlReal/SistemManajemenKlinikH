import apiFetch from "@/lib/api";
import type { ClinicInfo } from "@/types";

export const fetchAllClinicsAPI = async () => {
  const response = await apiFetch("/klinik");
  return response.data;
};

export const createOrUpdateClinicAPI = async (newClinic: ClinicInfo) => {
  await apiFetch("/klinik", {
    method: "POST",
    body: JSON.stringify(newClinic),
  });
  return;
};
