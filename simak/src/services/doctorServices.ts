import apiFetch from "@/lib/api";
import type { Doctor, ViewDoctor } from "@/types";

const transformDoctorToAPI = (doctor: Omit<Doctor, "id_dokter">) => ({
  ...doctor,
  tanggal_lahir: doctor.tanggal_lahir.toISOString().split("T")[0],
});

const transformDoctorFromAPI = (
  doctor: ViewDoctor
): Omit<ViewDoctor, "tanggal_lahir"> & { tanggal_lahir: Date } => ({
  ...doctor,
  tanggal_lahir: new Date(doctor.tanggal_lahir),
});

export const fetchAllDoctorsAPI = async () => {
  const response = await apiFetch("/dokter-lengkap");
  return response.data.map(transformDoctorFromAPI);
};

export const createDoctorAPI = async (newDoctor: Omit<Doctor, "id_dokter">) => {
  await apiFetch("/dokter", {
    method: "POST",
    body: JSON.stringify(transformDoctorToAPI(newDoctor)),
  });
  return;
};

export const updateDoctorAPI = async (updatedDoctor: Doctor) => {
  await apiFetch(`/dokter/${updatedDoctor.id_dokter}`, {
    method: "PUT",
    body: JSON.stringify(transformDoctorToAPI(updatedDoctor)),
  });
  return;
};

export const deleteDoctorAPI = async (id: string) => {
  await apiFetch(`/dokter/${id}`, {
    method: "DELETE",
  });
  return;
};
