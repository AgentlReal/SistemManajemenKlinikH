import * as auth from "@/hooks/use-auth";
import * as patientServices from "@/services/patientServices";
import { type Patient } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Toaster } from "sonner";
import { vi, type Mock } from "vitest";
import { ManagePatients } from "./ManagePatients";

// Mock the services
vi.mock("@/services/patientServices");
vi.mock("@/hooks/use-auth");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockPatients: Patient[] = [
  {
    id: "1",
    nik: "1234567890123456",
    name: "John Doe",
    birthDate: new Date("1990-01-01"),
    gender: "Laki-laki",
    address: "123 Main St",
    phone: "081234567890",
  },
  {
    id: "2",
    nik: "6543210987654321",
    name: "Jane Doe",
    birthDate: new Date("1992-02-02"),
    gender: "Perempuan",
    address: "456 Oak Ave",
    phone: "081234567891",
  },
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <Toaster />
  </QueryClientProvider>
);

describe("ManagePatients", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (patientServices.fetchAllPatientsAPI as Mock).mockResolvedValue(
      mockPatients
    );
    (patientServices.createPatientAPI as Mock).mockResolvedValue({});
    (patientServices.updatePatientAPI as Mock).mockResolvedValue({});
    (patientServices.deletePatientAPI as Mock).mockResolvedValue({});
  });

  it("should render the component and fetch patients", async () => {
    (auth.useAuth as Mock).mockReturnValue({
      user: { role: "admin" },
    });
    render(
      <TestWrapper>
        <ManagePatients />
      </TestWrapper>
    );

    expect(screen.getByText("Kelola Pasien")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  it("should show Add Patient button for authorized user", () => {
    (auth.useAuth as Mock).mockReturnValue({
      user: { role: "receptionist" },
    });
    render(
      <TestWrapper>
        <ManagePatients />
      </TestWrapper>
    );

    expect(screen.getByRole("button", { name: /tambah/i })).toBeInTheDocument();
  });

  it("should not show Add Patient button for unauthorized user", () => {
    (auth.useAuth as Mock).mockReturnValue({ user: { role: "doctor" } });
    render(
      <TestWrapper>
        <ManagePatients />
      </TestWrapper>
    );

    expect(
      screen.queryByRole("button", { name: /tambah/i })
    ).not.toBeInTheDocument();
  });

  it("should open Add Patient modal on add button click", async () => {
    (auth.useAuth as Mock).mockReturnValue({ user: { role: "admin" } });
    render(
      <TestWrapper>
        <ManagePatients />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: /tambah/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Tambah Pasien" })
      ).toBeInTheDocument();
    });
  });

  it("should allow creating a new patient", async () => {
    (auth.useAuth as Mock).mockReturnValue({ user: { role: "admin" } });
    render(
      <TestWrapper>
        <ManagePatients />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: /tambah/i }));

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("NIK"), {
        target: { value: "1122334455667788" },
      });
      fireEvent.change(screen.getByLabelText("Nama"), {
        target: { value: "New Patient" },
      });
      fireEvent.change(screen.getByLabelText("Tanggal Lahir"), {
        target: { value: "2000-01-01" },
      });
      fireEvent.change(screen.getByLabelText("Nomor Telepon"), {
        target: { value: "081234567892" },
      });
      fireEvent.change(screen.getByLabelText("Alamat"), {
        target: { value: "New Address" },
      });
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

    await waitFor(() => {
      expect(patientServices.createPatientAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          nik: "1122334455667788",
          name: "New Patient",
        })
      );
      expect(
        screen.getByText("Pasien berhasil ditambahkan!")
      ).toBeInTheDocument();
    });
  });

  it("should open Delete modal on delete button click", async () => {
    (auth.useAuth as Mock).mockReturnValue({ user: { role: "admin" } });
    render(
      <TestWrapper>
        <ManagePatients />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByTitle("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Delete Patient")).toBeInTheDocument();
    });
  });

  it("should delete a patient", async () => {
    (auth.useAuth as Mock).mockReturnValue({ user: { role: "admin" } });
    render(
      <TestWrapper>
        <ManagePatients />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByTitle("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Delete Patient")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(patientServices.deletePatientAPI).toHaveBeenCalledWith("1");
      expect(screen.getByText("Pasien berhasil dihapus!")).toBeInTheDocument();
    });
  });
});
