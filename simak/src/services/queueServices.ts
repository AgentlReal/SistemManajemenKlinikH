import type { QueueItem } from "@/types";
// import mockQueues from "../temp/mockQueue.json";

const mockQueues: QueueItem[] = [
  {
    id: "1",
    queueNumber: "A1",
    patientName: "Fulton Balsellie",
    department: "umum",
    doctor: "Pembroke Brimble",
    status: "berlangsung",
    time: "11:30",
  },
  {
    id: "2",
    queueNumber: "A2",
    patientName: "Kacie Deviney",
    department: "umum",
    doctor: "Ailina Venditti",
    status: "selesai",
    time: "04:31",
  },
  {
    id: "3",
    queueNumber: "A3",
    patientName: "Arvy Brunning",
    department: "gigi",
    doctor: "Tris Kopman",
    status: "selesai",
    time: "07:36",
  },
  {
    id: "4",
    queueNumber: "A4",
    patientName: "Harriett Tatlow",
    department: "umum",
    doctor: "Anson Gabbett",
    status: "menunggu",
    time: "11:30",
  },
  {
    id: "5",
    queueNumber: "A5",
    patientName: "Lisbeth Mead",
    department: "gigi",
    doctor: "Haydon Leachman",
    status: "menunggu",
    time: "05:24",
  },
];

let currentMockQueues = [...mockQueues] as unknown as QueueItem[];

const DELAY_DURATION = 1000;

// throw new Error('Test ERROR');

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchAllQueuesAPI = async () => {
  await delay(DELAY_DURATION);
  return currentMockQueues;
};

export const createQueueAPI = async (
  newQueue: Omit<QueueItem, "id" | "status" | "queueNumber">
) => {
  await delay(DELAY_DURATION);
  currentMockQueues = [
    ...currentMockQueues,
    {
      ...newQueue,
      id: Date.now().toString(),
      status: "menunggu",
      queueNumber:
        "A" +
        (parseInt(
          currentMockQueues[currentMockQueues.length - 1].queueNumber.slice(1)
        ) +
          1),
    },
  ];
};

export const updateQueueAPI = async (
  updatedQueue: Omit<QueueItem, "queueNumber">
) => {
  await delay(DELAY_DURATION);
  currentMockQueues = currentMockQueues.map((item) =>
    item.id === updatedQueue.id
      ? { queueNumber: item.queueNumber, ...updatedQueue }
      : item
  );
};

export const deleteQueueAPI = async (id: string) => {
  await delay(DELAY_DURATION);
  //   throw new Error("Test ERROR");
  currentMockQueues = currentMockQueues.filter((item) => item.id !== id);
};
