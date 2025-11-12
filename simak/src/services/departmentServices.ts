import apiFetch from "@/lib/api";
import type { Department } from "@/types";

export const fetchAllDepartmentsAPI = async () => {
  const response = await apiFetch("/poli");
  return response.data;
};

export const createDepartmentAPI = async (
  newDepartment: Omit<Department, "id_poli">
) => {
  await apiFetch("/poli", {
    method: "POST",
    body: JSON.stringify(newDepartment),
  });
  return;
};

export const updateDepartmentAPI = async (updatedDepartment: Department) => {
  await apiFetch(`/poli/${updatedDepartment.id_poli}`, {
    method: "PUT",
    body: JSON.stringify(updatedDepartment),
  });
  return;
};

export const deleteDepartmentAPI = async (id: number) => {
  await apiFetch(`/poli/${id}`, {
    method: "DELETE",
  });
  return;
};
