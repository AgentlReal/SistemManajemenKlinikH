import apiFetch from "@/lib/api";
import type { LabStaff } from "@/types";

const transformLabStaffToAPI = (labStaff: Omit<LabStaff, "id_staf_lab">) => ({
  ...labStaff,
  tanggal_lahir: labStaff.tanggal_lahir.toISOString().split("T")[0],
});

const transformLabStaffFromAPI = (labStaff: LabStaff): LabStaff => ({
  ...labStaff,
  tanggal_lahir: new Date(labStaff.tanggal_lahir),
});

export const fetchAllLabStaffsAPI = async () => {
  const response = await apiFetch("/staf-lab");
  return response.data.map(transformLabStaffFromAPI);
};

export const createLabStaffAPI = async (
  newLabStaff: Omit<LabStaff, "id_staf_lab">
) => {
  await apiFetch("/staf-lab", {
    method: "POST",
    body: JSON.stringify(transformLabStaffToAPI(newLabStaff)),
  });
  return;
};

export const updateLabStaffAPI = async (updatedLabStaff: LabStaff) => {
  await apiFetch(`/staf-lab/${updatedLabStaff.id_staf_lab}`, {
    method: "PUT",
    body: JSON.stringify(transformLabStaffToAPI(updatedLabStaff)),
  });
  return;
};

export const deleteLabStaffAPI = async (id: string) => {
  await apiFetch(`/staf-lab/${id}`, {
    method: "DELETE",
  });
  return;
};
