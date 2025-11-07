import type { LabStaff } from "@/types";

const mockLabStaffs = [
  {
    id: "1",
    name: "Eve Martinez",
    address: "123 Main St, Jakarta",
    gender: "male",
    license: "SIP-12347",
    birthDate: "1995-10-12",
    wage: 3000000,
    phone: "081234567890",
  },
  {
    id: "2",
    name: "Frank Garcia",
    address: "123 Main St, Jakarta",
    gender: "male",
    license: "SIP-12347",
    birthDate: "1990-07-09",
    wage: 3000000,
    phone: "081234567891",
  },
];

let currentMockLabStaffs = [...mockLabStaffs];

const DELAY_DURATION = 1000;

// throw new Error('Test ERROR');

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchAllLabStaffsAPI = async () => {
  await delay(DELAY_DURATION);
  return [
    ...currentMockLabStaffs.map((obj) => ({
      ...obj,
      birthDate: new Date(obj.birthDate),
    })),
  ] as LabStaff[];
};

export const createLabStaffAPI = async (newLabStaff: Omit<LabStaff, "id">) => {
  await delay(DELAY_DURATION);
  const labStaff = {
    ...newLabStaff,
    birthDate: newLabStaff.birthDate.toISOString(),
  };
  currentMockLabStaffs = [
    ...currentMockLabStaffs,
    {
      ...labStaff,
      id: Date.now().toString(),
    },
  ];
};

export const updateLabStaffAPI = async (updatedLabStaff: LabStaff) => {
  await delay(DELAY_DURATION);
  const labStaff = {
    ...updatedLabStaff,
    birthDate: updatedLabStaff.birthDate.toISOString(),
  };
  currentMockLabStaffs = currentMockLabStaffs.map((item) =>
    item.id === labStaff.id ? labStaff : item
  );
};

export const deleteLabStaffAPI = async (id: string) => {
  await delay(DELAY_DURATION);
  currentMockLabStaffs = currentMockLabStaffs.filter((item) => item.id !== id);
};
