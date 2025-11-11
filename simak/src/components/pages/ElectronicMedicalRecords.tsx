import apiFetch from "@/lib/api";
import { fetchAllPatientSOAPsAPI } from "@/services/soapNoteServices";
import type { SOAPNote, ViewSOAPNote } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AgeFromDate } from "age-calculator";
import { Activity, FileText, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AddLabResultModal } from "../modals/AddLabResultModal";
import { AddSoapNoteModal } from "../modals/AddSoapNoteModal";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface LabResult {
  id: string;
  date: string;
  testType: string;
  result: string;
  status: "normal" | "abnormal" | "pending";
  notes: string;
  staffLab: string;
}

const mockLabResults: LabResult[] = [
  {
    id: "1",
    date: "2025-10-12",
    testType: "Complete Blood Count (CBC)",
    result: "WBC: 7,500/μL, RBC: 5.2 M/μL, Hemoglobin: 14.5 g/dL",
    status: "normal",
    notes: "All values within normal range",
    staffLab: "Andhika Wiratama",
  },
  {
    id: "2",
    date: "2025-10-10",
    testType: "Blood Glucose",
    result: "Fasting: 95 mg/dL",
    status: "normal",
    notes: "Normal glucose levels",
    staffLab: "Andhika Wiratama",
  },
  {
    id: "3",
    date: "2025-10-08",
    testType: "Lipid Panel",
    result: "Total Cholesterol: 210 mg/dL, LDL: 135 mg/dL, HDL: 45 mg/dL",
    status: "abnormal",
    notes: "LDL slightly elevated. Recommend dietary changes.",
    staffLab: "Andhika Wiratama",
  },
];

interface Patient {
  id_pasien: number;
  NIK: string;
  nama: string;
  nomor_telepon: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  alamat: string;
}

export function ElectronicMedicalRecords() {
  const [searchNIK, setSearchNIK] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [soapNotes, setSoapNotes] = useState<ViewSOAPNote[]>([]);
  const [labResults] = useState<LabResult[]>(mockLabResults);
  const [isAddSoapNoteModalOpen, setIsAddSoapNoteModalOpen] = useState(false);
  const [isAddLabResultModalOpen, setIsAddLabResultModalOpen] = useState(false);

  const soapMutation = useMutation<ViewSOAPNote[], Error, string>({
    mutationFn: async (nik) => {
      const viewSoapNotes = await fetchAllPatientSOAPsAPI(nik);
      return viewSoapNotes;
    },
    onSuccess: (data) => {
      toast.success("Berhasil Mengambil SOAP");
      setSoapNotes(data);
    },
    onError: () => {
      toast.error("Gagal mengambil SOAP!");
    },
  });
  const patientMutation = useMutation<Patient, Error, string>({
    mutationFn: async (nik) => {
      const response = await apiFetch(`/pasien/nik/${nik}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Berhasil Mengambil Pasien");
      setSelectedPatient(data);
    },
    onError: () => {
      toast.error("Gagal mengambil Pasien!");
    },
  });

  const handleSearch = async () => {
    if (searchNIK) {
      patientMutation.mutate(searchNIK);
      soapMutation.mutate(searchNIK);
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
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="soap">
                <FileText className="w-4 h-4 mr-2" />
                SOAP Notes
              </TabsTrigger>
              <TabsTrigger value="lab">
                <Activity className="w-4 h-4 mr-2" />
                Lab Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="soap" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3>SOAP Notes History</h3>
                <Button
                  onClick={() => setIsAddSoapNoteModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Add New Note
                </Button>
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
                          Visit Date:{" "}
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
                <h3>Laboratory Results</h3>
                <Button
                  onClick={() => setIsAddLabResultModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Add Lab Result
                </Button>
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
                    <Card key={result.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            Visit Date:{" "}
                            {new Date(result.date).toLocaleDateString()}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {result.staffLab}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4>{result.testType}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(result.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <Label>Results</Label>
                            <p className="text-sm mt-1">{result.result}</p>
                          </div>
                          <div>
                            <Label>Notes</Label>
                            <p className="text-sm mt-1 text-muted-foreground">
                              {result.notes}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                          <Label>Status</Label>
                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                result.status === "normal"
                                  ? "bg-green-100 text-green-700"
                                  : result.status === "abnormal"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {result.status.charAt(0).toUpperCase() +
                                result.status.slice(1)}
                            </span>
                          </div>
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
            <h3 className="text-muted-foreground">No patient selected</h3>
            <p className="text-muted-foreground mt-2">
              Search for a patient by NIK to view their medical records
            </p>
          </CardContent>
        </Card>
      )}

      <AddSoapNoteModal
        isOpen={isAddSoapNoteModalOpen}
        onClose={() => setIsAddSoapNoteModalOpen(false)}
        onAdd={handleAddSoapNote}
      />

      <AddLabResultModal
        isOpen={isAddLabResultModalOpen}
        onClose={() => setIsAddLabResultModalOpen(false)}
        onAdd={handleAddLabResult}
      />
    </div>
  );
}
