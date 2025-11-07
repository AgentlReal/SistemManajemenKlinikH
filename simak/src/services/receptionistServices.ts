import type { Receptionist } from "@/types";

const mockReceptionists = [
  {
    id: "1",
    name: "Alice Johnson",
    address: "123 Main St, Jakarta",
    gender: "male",
    birthDate: "1995-10-12",
    wage: 3000000,
    phone: "081234567890",
  },
  {
    id: "2",
    name: "Bob Williams",
    address: "123 Main St, Jakarta",
    gender: "male",
    birthDate: "1990-07-09",
    wage: 3000000,
    phone: "081234567891",
  },
];

let currentMockReceptionists = [...mockReceptionists];

const DELAY_DURATION = 1000;

// throw new Error('Test ERROR');

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchAllReceptionistsAPI = async () => {
  await delay(DELAY_DURATION);
  return [
    ...currentMockReceptionists.map((obj) => ({
      ...obj,
      birthDate: new Date(obj.birthDate),
    })),
  ] as Receptionist[];
};

export const createReceptionistAPI = async (
  newReceptionist: Omit<Receptionist, "id">
) => {
  await delay(DELAY_DURATION);
  const receptionist = {
    ...newReceptionist,
    birthDate: newReceptionist.birthDate.toISOString(),
  };
  currentMockReceptionists = [
    ...currentMockReceptionists,
    {
      ...receptionist,
      id: Date.now().toString(),
    },
  ];
};

export const updateReceptionistAPI = async (
  updatedReceptionist: Receptionist
) => {
  await delay(DELAY_DURATION);
  const receptionist = {
    ...updatedReceptionist,
    birthDate: updatedReceptionist.birthDate.toISOString(),
  };
  currentMockReceptionists = currentMockReceptionists.map((item) =>
    item.id === receptionist.id ? receptionist : item
  );
};

export const deleteReceptionistAPI = async (id: string) => {
  await delay(DELAY_DURATION);
  currentMockReceptionists = currentMockReceptionists.filter(
    (item) => item.id !== id
  );
};
