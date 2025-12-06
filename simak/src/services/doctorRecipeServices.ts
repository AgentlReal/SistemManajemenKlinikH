import type { DoctorRecipe } from "@/components/modals/AddDoctorRecipeModal";
import apiFetch from "@/lib/api";
import type { ViewDoctorRecipe } from "@/types";

export const fetchAllPatientDoctorRecipesAPI = async (
  nik: string
): Promise<ViewDoctorRecipe[]> => {
  const response = await apiFetch(`/resep-dokter/pasien/${nik}`);
  return response.data;
};

export const createPatientDoctorRecipeAPI = async (
  newPatientDoctorRecipe: DoctorRecipe
) => {
  await apiFetch("/resep-dokter", {
    method: "POST",
    body: JSON.stringify(newPatientDoctorRecipe),
  });
  return;
};

export const fetchAllDoctorRecipesAPI = async (): Promise<
  ViewDoctorRecipe[]
> => {
  const response = await apiFetch(`/resep-dokter`);
  return response.data;
};
