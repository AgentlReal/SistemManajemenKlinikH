import apiFetch from "@/lib/api";
import type { Schedule, ViewSchedule } from "@/types";

export interface EmployeeWithoutSchedule {
  jenis_karyawan: string;
  id_karyawan: string;
  nama_karyawan: string;
  spesialis: string;
  unit_kerja: string;
  nomor_telepon: string;
  jenis_kelamin: string;
  jabatan_lainnya: string | null;
}

export const fetchAllSchedulesAPI = async (): Promise<ViewSchedule[]> => {
  const response = await apiFetch(`/jadwal-karyawan-lengkap`);
  return response.data;
};

export const fetchAllEmployeesWithoutSchedulesAPI = async (): Promise<
  EmployeeWithoutSchedule[]
> => {
  const response = await apiFetch(`/karyawan-tanpa-jadwal`);
  return response.data;
};

export const createScheduleAPI = async (
  newSchedule: Omit<Schedule, "id_jadwal">
) => {
  await apiFetch("/jadwal-karyawan", {
    method: "POST",
    body: JSON.stringify(newSchedule),
  });
  return;
};

export const updateScheduleAPI = async (updatedSchedule: Schedule) => {
  await apiFetch(`/jadwal-karyawan/${updatedSchedule.id_jadwal}`, {
    method: "PUT",
    body: JSON.stringify(updatedSchedule),
  });
  return;
};

export const deleteScheduleAPI = async (id: number) => {
  await apiFetch(`/jadwal-karyawan/${id}`, {
    method: "DELETE",
  });
  return;
};
