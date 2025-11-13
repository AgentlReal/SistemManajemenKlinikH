import z from "zod";

export type Role =
  | "admin"
  | "receptionist"
  | "doctor"
  | "lab"
  | "cashier"
  | "manager";

const warnings = {
  nik: {
    min: "NIK harus diisi",
    length: "NIK harus 16 digit",
    regex: "NIK hanya boleh berisi angka",
  },
  name: {
    min: "Nama harus diisi",
    max: "Nama tidak boleh lebih dari 100 karakter",
  },
  gender: "Jenis Kelamin harus 'Laki-laki' atau 'Perempuan'",
  address: {
    min: "Alamat harus diisi",
    max: "Alamat tidak boleh lebih dari 500 karakter",
  },
  phone: {
    min: "No Telp harus diisi",
    regex: "No Telp harus berupa nomor yang valid",
  },
  wage: {
    int: "Gaji tidak boleh desimal",
    min: "Gaji tidak boleh negatif",
  },
  specialty: {
    min: "Spesialis harus diisi",
    max: "Spesialis tidak boleh lebih dari 500 karakter",
  },
  license: {
    min: "No Lisensi harus diisi",
    max: "No Lisensi tidak boleh lebih dari 500 karakter",
  },
  birthDate: {
    min: "Tanggal lahir harus diisi",
    max: "Too young",
  },
  category: "Kategori harus 'dokter' atau 'lab'",
  service: {
    min: "Nama Layanan harus diisi",
    max: "Nama Layanan tidak boleh lebih dari 500 karakter",
  },

  fee: {
    int: "Tarif tidak boleh desimal",
    min: "Tarif tidak boleh negatif",
  },
};

//Zod Form Schemas
export const patientSchema = z.object({
  nik: z
    .string()
    .min(1, warnings.nik.min)
    .length(16, warnings.nik.length)
    .regex(/^\d+$/, warnings.nik.regex),

  name: z.string().min(1, warnings.name.min).max(100, warnings.name.max),

  birthDate: z
    .date({
      error: warnings.birthDate.min,
    })
    .max(new Date(), { error: warnings.birthDate.max }),

  gender: z.enum(["Laki-laki", "Perempuan"], warnings.gender),

  address: z
    .string()
    .min(1, warnings.address.min)
    .max(500, warnings.address.max),

  phone: z
    .string()
    .min(1, warnings.phone.min)
    .regex(/^(\+62|62|0)[0-9]{8,15}$/, warnings.phone.regex),
});

export const queueItemSchema = z.object({
  patientName: z.string().min(1, warnings.name.min).max(100, warnings.name.max),
  department: z.string().min(1, warnings.name.min).max(100, warnings.name.max),
  doctor: z.string().min(1, warnings.name.min).max(100, warnings.name.max),
  status: z.enum<QueueStatus[]>(
    ["Menunggu", "Berlangsung", "Selesai"],
    "Status harus diisi"
  ),
  tanggal: z.string(),
});

export const receptionistSchema = z.object({
  nama: z.string().min(1, warnings.name.min).max(100, warnings.name.max),

  tanggal_lahir: z
    .date({
      error: warnings.birthDate.min,
    })
    .max(new Date(), { error: warnings.birthDate.max }),
  gaji: z.coerce.number().int(warnings.wage.int).min(0, warnings.wage.min),

  nomor_telepon: z
    .string()
    .min(1, warnings.phone.min)
    .regex(/^(\+62|62|0)[0-9]{8,15}$/, warnings.phone.regex),

  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], warnings.gender),

  alamat: z
    .string()
    .min(1, warnings.address.min)
    .max(500, warnings.address.max),
});

export const doctorSchema = z.object({
  nama: z.string().min(1, warnings.name.min).max(100, warnings.name.max),

  id_poli: z.coerce.number("Poli harus diisi"),

  tanggal_lahir: z
    .date({
      error: warnings.birthDate.min,
    })
    .max(new Date(), { error: warnings.birthDate.max }),

  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], warnings.gender),

  alamat: z
    .string()
    .min(1, warnings.address.min)
    .max(500, warnings.address.max),

  spesialis: z
    .string()
    .min(1, warnings.specialty.min)
    .max(500, warnings.specialty.max),

  nomor_lisensi: z
    .string()
    .min(1, warnings.license.min)
    .max(500, warnings.license.max),

  nomor_telepon: z
    .string()
    .min(1, warnings.phone.min)
    .regex(/^(\+62|62|0)[0-9]{8,15}$/, warnings.phone.regex),

  gaji: z.coerce.number().int(warnings.wage.int).min(0, warnings.wage.min),
});

export const cashierSchema = z.object({
  nama: z.string().min(1, warnings.name.min).max(100, warnings.name.max),

  tanggal_lahir: z
    .date({
      error: warnings.birthDate.min,
    })
    .max(new Date(), { error: warnings.birthDate.max }),

  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], warnings.gender),

  alamat: z
    .string()
    .min(1, warnings.address.min)
    .max(500, warnings.address.max),

  nomor_telepon: z
    .string()
    .min(1, warnings.phone.min)
    .regex(/^(\+62|62|0)[0-9]{8,15}$/, warnings.phone.regex),

  gaji: z.coerce.number().int(warnings.wage.int).min(0, warnings.wage.min),
});

export const labStaffSchema = z.object({
  nama: z.string().min(1, warnings.name.min).max(100, warnings.name.max),

  tanggal_lahir: z
    .date({
      error: warnings.birthDate.min,
    })
    .max(new Date(), { error: warnings.birthDate.max }),

  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"], warnings.gender),

  alamat: z
    .string()
    .min(1, warnings.address.min)
    .max(500, warnings.address.max),

  nomor_telepon: z
    .string()
    .min(1, warnings.phone.min)
    .regex(/^(\+62|62|0)[0-9]{8,15}$/, warnings.phone.regex),

  gaji: z.coerce.number().int(warnings.wage.int).min(0, warnings.wage.min),

  nomor_lisensi: z
    .string()
    .min(1, warnings.license.min)
    .max(500, warnings.license.max),
});

export const serviceFeeSchema = z.object({
  tipe_layanan: z.enum(["Dokter", "Laboratorium"], warnings.category),

  nama_layanan: z
    .string()
    .min(1, warnings.service.min)
    .max(500, warnings.service.max),

  Harga: z.coerce.number().int(warnings.fee.int).min(0, warnings.fee.min),
});

export const clinicInfoSchema = z.object({
  name: z.string().min(1, warnings.name.min).max(100, warnings.name.max),

  address: z
    .string()
    .min(1, warnings.address.min)
    .max(500, warnings.address.max),

  phone: z
    .string()
    .min(1, warnings.phone.min)
    .regex(/^(\+62|62|0)[0-9]{8,15}$/, warnings.phone.regex),

  email: z
    .email("Tolong masukkan email yang valid")
    .min(1, "Email harus diisi")
    .max(255, "Email tidak boleh lebih dari 255 karakter"),

  license: z
    .string()
    .min(1, warnings.license.min)
    .max(500, warnings.license.max),

  operatingHours: z.string().min(1, "Jam beroperasi harus diisi"),
});

export const departmentSchema = z.object({
  nama_poli: z.string().min(1, warnings.name.min).max(100, warnings.name.max),
});

export const scheduleSchema = z.object({
  employeeName: z
    .string()
    .min(1, warnings.name.min)
    .max(100, warnings.name.max),
  startHour: z.string(),
  endHour: z.string(),
});

//Types
export type Patient = {
  id: string;
} & z.infer<typeof patientSchema>;

export type QueueStatus = "Menunggu" | "Berlangsung" | "Selesai";

export type TransactionStatus = "Lunas" | "Belum Lunas";

export interface Transaction {
  id: string;
  transactionId: string;
  patientName: string;
  date: string;
  items: string[];
  total: number;
  status: TransactionStatus;
  paymentMethod?: string;
}

export interface ViewTransactionAPI {
  id_pembayaran: number;
  nama_pasien: string;
  tanggal_transaksi: string;
  jumlah_total: string;
  status_pembayaran: TransactionStatus;
  metode_pembayaran: string;
}
export interface ViewTransactionClient {
  id_pembayaran: number;
  nama_pasien: string;
  tanggal_transaksi: Date;
  jumlah_total: number;
  status_pembayaran: TransactionStatus;
  metode_pembayaran: string;
}

export interface ViewService {
  id_penggunaan_layanan: number;
  id_pembayaran: number;
  id_tarif_layanan: number;
  nama_layanan: string;
  tipe_layanan: string;
  kuantitas: number;
  harga_saat_itu: number;
}

export interface Service {
  id_penggunaan_layanan: number;
  id_pembayaran: number;
  id_tarif_layanan: number;
  kuantitas: number;
  harga_saat_itu: number;
}

export type Receptionist = {
  id_resepsionis: string;
} & z.infer<typeof receptionistSchema>;

export type Doctor = {
  id_dokter: string;
} & z.infer<typeof doctorSchema>;

export type ViewDoctor = {
  id_dokter: string;
  id_poli: number;
  nama_poli: string;
  nama_dokter: string;
  tanggal_lahir: string;
  gaji: number;
  nomor_telepon: string;
  spesialis: string;
  nomor_lisensi: string;
  jenis_kelamin: "Laki-laki" | "Perempuan";
  alamat: string;
};
export type Cashier = {
  id_kasir: string;
} & z.infer<typeof cashierSchema>;

export type LabStaff = {
  id_staf_lab: string;
} & z.infer<typeof labStaffSchema>;

export type ServiceFee = {
  id_tarif_layanan: number;
} & z.infer<typeof serviceFeeSchema>;

export type Department = {
  id_poli: number;
} & z.infer<typeof departmentSchema>;

export type Schedule = {
  id: string;
} & z.infer<typeof scheduleSchema>;

export type ClinicInfo = z.infer<typeof clinicInfoSchema>;

export interface SOAPNote {
  id_soap: number;
  id_rekam_medis: number;
  id_dokter: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  tanggal_pencatatan: string;
}
export interface ViewSOAPNote {
  id_soap: number;
  id_rekam_medis: number;
  id_dokter: string;
  nama_dokter: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  tanggal_pencatatan: string;
}

export interface ViewLabResult {
  id_hasil_lab: number;
  id_staf_lab: string;
  id_rekam_medis: number;
  nama_staf_lab: string;
  jenis_pemeriksaan: string;
  tanggal_pemeriksaan: string;
  keterangan: string;
  hasil_pemeriksaan: string;
}

export interface ViewDoctorRecipe {
  id_resep_dokter: number;
  id_dokter: string;
  id_rekam_medis: number;
  id_pembayaran: number;
  nama_dokter: string;
  nama_obat: string;
  keterangan_resep: string;
  tanggal_resep: string;
}

export interface BackendQueuePayload {
  id_antrian: number;
  id_resepsionis: string;
  id_dokter: string;
  id_pasien: number;
  keluhan: string;
  nomor_antrian: string;
  keterangan: QueueStatus;
}

export interface BackendQueueResponse {
  id_antrian: number;
  id_pasien: number;
  id_dokter: string;
  nomor_antrian: string;
  nama_pasien: string;
  poli: string;
  nama_dokter: string;
  keluhan: string;
  tanggal: string;
  keterangan: QueueStatus;
}
