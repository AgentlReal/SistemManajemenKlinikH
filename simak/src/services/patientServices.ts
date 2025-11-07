import type { Patient } from "@/types";
import apiFetch from "@/lib/api";

const transformPatientToAPI = (patient: Omit<Patient, "id">) => ({
  NIK: patient.nik,
  nama: patient.name,
  tanggal_lahir: patient.birthDate.toISOString().split("T")[0],
  jenis_kelamin: patient.gender,
  alamat: patient.address,
  nomor_telepon: patient.phone,
});

const transformPatientFromAPI = (patient: any): Patient => ({
  id: patient.id_pasien.toString(),
  nik: patient.NIK,
  name: patient.nama,
  birthDate: new Date(patient.tanggal_lahir),
  gender: patient.jenis_kelamin,
  address: patient.alamat,
  phone: patient.nomor_telepon,
});

export const fetchAllPatientsAPI = async (): Promise<Patient[]> => {
  const response = await apiFetch("/pasien");
  return response.data.map(transformPatientFromAPI);
};

export const createPatientAPI = async (newPatient: Omit<Patient, "id">) => {
  await apiFetch("/pasien", {
    method: "POST",
    body: JSON.stringify(transformPatientToAPI(newPatient)),
  });
};

export const updatePatientAPI = async (updatedPatient: Patient) => {
  await apiFetch(`/pasien/${updatedPatient.id}`, {
    method: "PUT",
    body: JSON.stringify(transformPatientToAPI(updatedPatient)),
  });
};

export const deletePatientAPI = async (id: string) => {
  await apiFetch(`/pasien/${id}`, {
    method: "DELETE",
  });
};