import type { Cashier } from "@/types";

const mockCashiers = [
  {
    id: "1",
    name: "Charlie Brown",
    address: "123 Main St, Jakarta",
    gender: "male",
    wage: 3000000,
    phone: "081234567890",
    birthDate: "1995-10-12",
  },
  {
    id: "2",
    name: "David Alvero",
    address: "123 Main St, Jakarta",
    gender: "male",
    wage: 3000000,
    phone: "081234567891",
    birthDate: "1990-07-09",
  },
];

let currentMockCashiers = [...mockCashiers];

const DELAY_DURATION = 1000;

// throw new Error('Test ERROR');

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchAllCashiersAPI = async () => {
  await delay(DELAY_DURATION);
  return [
    ...currentMockCashiers.map((obj) => ({
      ...obj,
      birthDate: new Date(obj.birthDate),
    })),
  ] as Cashier[];
};

export const createCashierAPI = async (newCashier: Omit<Cashier, "id">) => {
  await delay(DELAY_DURATION);
  const cashier = {
    ...newCashier,
    birthDate: newCashier.birthDate.toISOString(),
  };
  currentMockCashiers = [
    ...currentMockCashiers,
    {
      ...cashier,
      id: Date.now().toString(),
    },
  ];
};

export const updateCashierAPI = async (updatedCashier: Cashier) => {
  await delay(DELAY_DURATION);
  const cashier = {
    ...updatedCashier,
    birthDate: updatedCashier.birthDate.toISOString(),
  };
  currentMockCashiers = currentMockCashiers.map((item) =>
    item.id === cashier.id ? cashier : item
  );
};

export const deleteCashierAPI = async (id: string) => {
  await delay(DELAY_DURATION);
  currentMockCashiers = currentMockCashiers.filter((item) => item.id !== id);
};
