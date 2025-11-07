import type { Department } from "@/types";

const mockDepartments = [
  {
    id: "1",
    name: "General Medicine",
  },
  {
    id: "2",
    name: "Cardiology",
  },
  {
    id: "3",
    name: "Pediatrics",
  },
  {
    id: "4",
    name: "Orthopedics",
  },
];

let currentMockDepartments = [...mockDepartments];

const DELAY_DURATION = 1000;

// throw new Error('Test ERROR');

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchAllDepartmentsAPI = async () => {
  await delay(DELAY_DURATION);
  return [...currentMockDepartments] as Department[];
};

export const createDepartmentAPI = async (
  newDepartment: Omit<Department, "id">
) => {
  await delay(DELAY_DURATION);
  const receptionist = {
    ...newDepartment,
  };
  currentMockDepartments = [
    ...currentMockDepartments,
    {
      ...receptionist,
      id: Date.now().toString(),
    },
  ];
};

export const updateDepartmentAPI = async (updatedDepartment: Department) => {
  await delay(DELAY_DURATION);
  const receptionist = {
    ...updatedDepartment,
  };
  currentMockDepartments = currentMockDepartments.map((item) =>
    item.id === receptionist.id ? receptionist : item
  );
};

export const deleteDepartmentAPI = async (id: string) => {
  await delay(DELAY_DURATION);
  currentMockDepartments = currentMockDepartments.filter(
    (item) => item.id !== id
  );
};
