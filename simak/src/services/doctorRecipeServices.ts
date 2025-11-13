import apiFetch from "@/lib/api";
import type { ViewDoctorRecipe } from "@/types";

export const fetchAllPatientDoctorRecipesAPI = async (
  nik: string
): Promise<ViewDoctorRecipe[]> => {
  const response = await apiFetch(`/resep-dokter/pasien/${nik}`);
  return response.data;
};
