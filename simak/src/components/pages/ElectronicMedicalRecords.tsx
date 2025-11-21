import { useAuth } from "@/hooks/use-auth";
import apiFetch from "@/lib/api";
import { fetchAllPatientDoctorRecipesAPI } from "@/services/doctorRecipeServices";
import {
  createPatientLabResultAPI,
  fetchAllPatientLabResultsAPI,
} from "@/services/labResultServices";
import {
  createPatientSOAPAPI,
  fetchAllPatientSOAPsAPI,
} from "@/services/soapNoteServices";
import type {
  LabResult,
  SOAPNote,
  ViewDoctorRecipe,
  ViewLabResult,
  ViewSOAPNote,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AgeFromDate } from "age-calculator";
import { Activity, ClipboardEdit, FileText, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AddDoctorRecipeModal } from "../modals/AddDoctorRecipeModal";
import { AddLabResultModal } from "../modals/AddLabResultModal";
import { AddSoapNoteModal } from "../modals/AddSoapNoteModal";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Patient {
  id_pasien: number;
  NIK: string;
  nama: string;
  nomor_telepon: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  alamat: string;
}

interface ElectronicMedicalRecord {
  id_rekam_medis: number;
  id_pasien: number;
  tanggal_pencatatan: string;
}

const authorizedRolesDoctor = ["admin", "doctor"];
const authorizedRolesLab = ["admin", "lab"];

export function ElectronicMedicalRecords() {
  const [searchNIK, setSearchNIK] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedElectronicMedicalRecord, setSelectedElectronicMedicalRecord] =
    useState<ElectronicMedicalRecord | null>(null);
  const [soapNotes, setSoapNotes] = useState<ViewSOAPNote[]>([]);
  const [labResults, setLabResults] = useState<ViewLabResult[]>([]);
  const [doctorRecipes, setDoctorRecipes] = useState<ViewDoctorRecipe[]>([]);
  const [isAddSoapNoteModalOpen, setIsAddSoapNoteModalOpen] = useState(false);
  const [isAddLabResultModalOpen, setIsAddLabResultModalOpen] = useState(false);
  const [isAddDoctorRecipeModalOpen, setIsAddDoctorRecipeModalOpen] =
    useState(false);

  const { user } = useAuth();

  const soapMutation = useMutation<ViewSOAPNote[], Error, string>({
    mutationFn: async (nik) => {
      const viewSoapNotes = await fetchAllPatientSOAPsAPI(nik);
      return viewSoapNotes;
    },
    onSuccess: (data) => {
      setSoapNotes(data);
    },
    onError: () => {
      toast.error("Gagal mengambil SOAP!");
      setSoapNotes([]);
    },
  });

  const createSoapMutation = useMutation<
    SOAPNote,
    Error,
    Omit<SOAPNote, "id_soap">
  >({
    mutationFn: async (newSOAP) => {
      const viewSoapNotes = await createPatientSOAPAPI(newSOAP);
      return {} as SOAPNote;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan SOAP!");
      soapMutation.mutate(searchNIK);
    },
    onError: () => {
      toast.error("Gagal menambahkan SOAP!");
    },
  });

  const labResultMutation = useMutation<ViewLabResult[], Error, string>({
    mutationFn: async (nik) => {
      const viewSoapNotes = await fetchAllPatientLabResultsAPI(nik);
      return viewSoapNotes;
    },
    onSuccess: (data) => {
      setLabResults(data);
    },
    onError: () => {
      toast.error("Gagal mengambil Hasil Lab!");
      setLabResults([]);
    },
  });
  const createLabResultMutation = useMutation<
    LabResult,
    Error,
    Omit<LabResult, "id_hasil_lab">
  >({
    mutationFn: async (newLabResult) => {
      await createPatientLabResultAPI(newLabResult);
      return {} as LabResult;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan Hasil Lab!");
      soapMutation.mutate(searchNIK);
    },
    onError: () => {
      toast.error("Gagal menambahkan Hasil Lab!");
    },
  });

  const doctorRecipeMutation = useMutation<ViewDoctorRecipe[], Error, string>({
    mutationFn: async (nik) => {
      const viewSoapNotes = await fetchAllPatientDoctorRecipesAPI(nik);
      return viewSoapNotes;
    },
    onSuccess: (data) => {
      setDoctorRecipes(data);
    },
    onError: () => {
      toast.error("Gagal mengambil resep dokter!");
      setDoctorRecipes([]);
    },
  });

  const patientMutation = useMutation<Patient, Error, string>({
    mutationFn: async (nik) => {
      const response = await apiFetch(`/pasien/nik/${nik}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Berhasil Mengambil Rekam Medis Pasien");
      setSelectedPatient(data);
    },
    onError: () => {
      toast.error("Gagal mengambil Rekam Medis Pasien!");
      setSelectedPatient(null);
    },
  });

  const electronicMedicalRecordMutation = useMutation<
    ElectronicMedicalRecord,
    Error,
    string
  >({
    mutationFn: async (nik) => {
      const response = await apiFetch(`/rekam-medis/pasien/${nik}`);
      return response.data;
    },
    onSuccess: (data) => {
      setSelectedElectronicMedicalRecord(() => data);
    },
    onError: () => {
      setSelectedElectronicMedicalRecord(null);
    },
  });

  const handleSearch = async () => {
    if (searchNIK) {
      patientMutation.mutate(searchNIK);
      electronicMedicalRecordMutation.mutate(searchNIK);
      soapMutation.mutate(searchNIK);
      labResultMutation.mutate(searchNIK);
      doctorRecipeMutation.mutate(searchNIK);
    }
  };

  const handleAddSoapNote = (
    data: Omit<SOAPNote, "id" | "date" | "doctor">
  ) => {
    console.log("New SOAP Note:", data);
    toast.success("SOAP note added successfully!");
  };

  const handleAddLabResult = (data: any) => {
    console.log("New Lab Result:", data);
    toast.success("Lab result added successfully!");
  };

  const handleAddDoctorRecipe = (data: any) => {
    // setDoctorRecipes([newRecipe, ...doctorRecipes]);
    toast.success("Resep dokter berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Rekam Medis Elektronik</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola rekam medis
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cari Rekam Medis Pasien</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Masukkan NIK Pasien..."
                value={searchNIK}
                onChange={(e) => setSearchNIK(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient Info Card */}
      {selectedPatient && (
        <>
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-900">Informasi Pasien</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">NIK</p>
                  <p className="font-mono">{selectedPatient.NIK}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <p>{selectedPatient.nama}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Umur</p>
                  <p>
                    {
                      new AgeFromDate(new Date(selectedPatient.tanggal_lahir))
                        .age
                    }{" "}
                    tahun
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                  <p>{selectedPatient.jenis_kelamin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No Telp</p>
                  <p>{selectedPatient.nomor_telepon}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alamat</p>
                  <p className="truncate">{selectedPatient.alamat}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Records Tabs */}
          <Tabs defaultValue="soap" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="soap">
                <FileText className="w-4 h-4 mr-2" />
                SOAP
              </TabsTrigger>
              <TabsTrigger value="lab">
                <Activity className="w-4 h-4 mr-2" />
                Hasil Lab
              </TabsTrigger>
              <TabsTrigger value="recipe">
                <ClipboardEdit className="w-4 h-4 mr-2" />
                Resep Dokter
              </TabsTrigger>
            </TabsList>

            <TabsContent value="soap" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3>Riwayat SOAP</h3>
                {user &&
                  !!authorizedRolesDoctor.find(
                    (role) => role === user.role
                  ) && (
                    <Button
                      onClick={() => setIsAddSoapNoteModalOpen(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Tambah SOAP
                    </Button>
                  )}
              </div>

              {!soapNotes.length ? (
                <Card>
                  <CardContent>Pasien ini belum memiliki SOAP</CardContent>
                </Card>
              ) : (
                soapNotes.map((note) => (
                  <Card key={note.id_soap}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          Tanggal Pencatatan:{" "}
                          {new Date(
                            note.tanggal_pencatatan
                          ).toLocaleDateString()}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground">
                          {note.nama_dokter}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-green-700">Subjective (S)</Label>
                        <p className="text-sm mt-1 text-gray-700">
                          {note.subjective}
                        </p>
                      </div>
                      <div>
                        <Label className="text-green-700">Objective (O)</Label>
                        <p className="text-sm mt-1 text-gray-700">
                          {note.objective}
                        </p>
                      </div>
                      <div>
                        <Label className="text-green-700">Assessment (A)</Label>
                        <p className="text-sm mt-1 text-gray-700">
                          {note.assessment}
                        </p>
                      </div>
                      <div>
                        <Label className="text-green-700">Plan (P)</Label>
                        <p className="text-sm mt-1 text-gray-700">
                          {note.plan}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="lab" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3>Riwayat Pemeriksaan Lab</h3>
                {user &&
                  !!authorizedRolesLab.find((role) => role === user.role) && (
                    <Button
                      onClick={() => setIsAddLabResultModalOpen(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Tambah Hasil Lab
                    </Button>
                  )}
              </div>

              <div className="grid gap-4">
                {!labResults.length ? (
                  <Card>
                    <CardContent>
                      Pasien ini belum memiliki hasil lab
                    </CardContent>
                  </Card>
                ) : (
                  labResults.map((result) => (
                    <Card key={result.id_hasil_lab}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            Tanggal Pencatatan:{" "}
                            {new Date(
                              result.tanggal_pemeriksaan
                            ).toLocaleDateString()}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {result.nama_staf_lab}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4>{result.jenis_pemeriksaan}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(
                                result.tanggal_pemeriksaan
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <Label>Results</Label>
                            <p className="text-sm mt-1">
                              {result.hasil_pemeriksaan}
                            </p>
                          </div>
                          <div>
                            <Label>Notes</Label>
                            <p className="text-sm mt-1 text-muted-foreground">
                              {result.keterangan}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="recipe" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3>Riwayat Resep Dokter</h3>
                {user &&
                  !!authorizedRolesDoctor.find(
                    (role) => role === user.role
                  ) && (
                    <Button
                      onClick={() => setIsAddDoctorRecipeModalOpen(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ClipboardEdit className="w-4 h-4 mr-2" />
                      Tambah Resep
                    </Button>
                  )}
              </div>

              <div className="grid gap-4">
                {!doctorRecipes.length ? (
                  <Card>
                    <CardContent>
                      <p>Pasien ini belum memiliki resep dokter.</p>
                    </CardContent>
                  </Card>
                ) : (
                  doctorRecipes.map((recipe) => (
                    <Card key={recipe.id_resep_dokter}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            Tanggal Resep:{" "}
                            {new Date(
                              recipe.tanggal_resep
                            ).toLocaleDateString()}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {recipe.nama_dokter}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-green-700">Nama Obat</Label>
                          <p className="text-sm mt-1 text-gray-700">
                            {recipe.nama_obat}
                          </p>
                        </div>
                        <div>
                          <Label className="text-green-700">
                            Keterangan Resep
                          </Label>
                          <p className="text-sm mt-1 text-gray-700">
                            {recipe.keterangan_resep}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {!selectedPatient && (
        <Card className="py-12">
          <CardContent className="text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-muted-foreground">
              Tidak ada pasien yang dipilih.
            </h3>
            <p className="text-muted-foreground mt-2">
              Cari rekam medis pasien menggunakan NIK untuk menampilkan rekam
              medisnya.
            </p>
          </CardContent>
        </Card>
      )}

      <AddSoapNoteModal
        isOpen={isAddSoapNoteModalOpen}
        onClose={() => {
          setIsAddSoapNoteModalOpen(false);
        }}
        onAdd={createSoapMutation.mutate}
        editingSOAP={null}
        onUpdate={() => {}}
        id_rekam_medis={selectedElectronicMedicalRecord?.id_rekam_medis}
      />

      <AddLabResultModal
        isOpen={isAddLabResultModalOpen}
        onClose={() => setIsAddLabResultModalOpen(false)}
        onAdd={createLabResultMutation.mutate}
        editingLabResult={null}
        onUpdate={() => {}}
        id_rekam_medis={selectedElectronicMedicalRecord?.id_rekam_medis}
      />

      <AddDoctorRecipeModal
        isOpen={isAddDoctorRecipeModalOpen}
        onClose={() => setIsAddDoctorRecipeModalOpen(false)}
        onAdd={handleAddDoctorRecipe}
      />
    </div>
  );
}
