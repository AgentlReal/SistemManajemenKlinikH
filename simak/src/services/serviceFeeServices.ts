import type { ServiceFee } from "@/types";

const mockServiceFees = [
  {
    id: "1",
    service: "General Consultation",
    fee: 150000,
    category: "dokter",
  },
  {
    id: "2",
    service: "Specialist Consultation",
    fee: 300000,
    category: "dokter",
  },
  {
    id: "3",
    service: "Complete Blood Count",
    fee: 200000,
    category: "lab",
  },
  { id: "4", service: "X-Ray", fee: 250000, category: "lab" },
  { id: "5", service: "Ultrasound", fee: 350000, category: "lab" },
];

let currentMockServiceFees = [...mockServiceFees];

const DELAY_DURATION = 1000;

// throw new Error('Test ERROR');

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchAllServiceFeesAPI = async () => {
  await delay(DELAY_DURATION);
  return [...currentMockServiceFees] as ServiceFee[];
};

export const createServiceFeeAPI = async (
  newServiceFee: Omit<ServiceFee, "id">
) => {
  await delay(DELAY_DURATION);
  const receptionist = {
    ...newServiceFee,
  };
  currentMockServiceFees = [
    ...currentMockServiceFees,
    {
      ...receptionist,
      id: Date.now().toString(),
    },
  ];
};

export const updateServiceFeeAPI = async (updatedServiceFee: ServiceFee) => {
  await delay(DELAY_DURATION);
  const receptionist = {
    ...updatedServiceFee,
  };
  currentMockServiceFees = currentMockServiceFees.map((item) =>
    item.id === receptionist.id ? receptionist : item
  );
};

export const deleteServiceFeeAPI = async (id: string) => {
  await delay(DELAY_DURATION);
  currentMockServiceFees = currentMockServiceFees.filter(
    (item) => item.id !== id
  );
};
