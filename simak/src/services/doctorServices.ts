import type { Doctor } from "@/types";

const mockDoctors = [
  {
    id: "1",
    name: "Dr. John Smith",
    specialty: "General",
    license: "SIP-12345",
    phone: "081234567892",
    address: "123 Main St, Jakarta",
    birthDate: "1990-07-09",
    gender: "male",
    wage: 3000000,
    department: "umum",
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    license: "SIP-12346",
    phone: "081234567893",
    birthDate: "1992-05-25",
    address: "123 Main St, Jakarta",
    gender: "male",
    wage: 3000000,
    department: "umum",
  },
  {
    id: "3",
    name: "Dr. Michael Williams",
    specialty: "Pediatrics",
    license: "SIP-12347",
    birthDate: "1989-06-29",
    phone: "081234567894",
    address: "123 Main St, Jakarta",
    gender: "male",
    wage: 3000000,
    department: "gigi",
  },
];

let currentMockDoctors = [...mockDoctors];

const DELAY_DURATION = 1000;

// throw new Error('Test ERROR');

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchAllDoctorsAPI = async () => {
  await delay(DELAY_DURATION);
  return [
    ...currentMockDoctors.map((obj) => ({
      ...obj,
      birthDate: new Date(obj.birthDate),
    })),
  ] as Doctor[];
};

export const createDoctorAPI = async (newDoctor: Omit<Doctor, "id">) => {
  await delay(DELAY_DURATION);
  const doctor = {
    ...newDoctor,
    birthDate: newDoctor.birthDate.toISOString(),
  };
  currentMockDoctors = [
    ...currentMockDoctors,
    {
      ...doctor,
      id: Date.now().toString(),
    },
  ];
};

export const updateDoctorAPI = async (updatedDoctor: Doctor) => {
  await delay(DELAY_DURATION);
  const doctor = {
    ...updatedDoctor,
    birthDate: updatedDoctor.birthDate.toISOString(),
  };
  currentMockDoctors = currentMockDoctors.map((item) =>
    item.id === doctor.id ? doctor : item
  );
};

export const deleteDoctorAPI = async (id: string) => {
  await delay(DELAY_DURATION);
  //   throw new Error("Test ERROR");
  currentMockDoctors = currentMockDoctors.filter((item) => item.id !== id);
};
